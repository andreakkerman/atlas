const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, status, text, contentType = "text/plain; charset=utf-8") {
  response.writeHead(status, { "content-type": contentType });
  response.end(text);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function levelDir(levelId) {
  const safeId = String(levelId || "").replace(/[^A-Za-z0-9_-]/g, "");
  return path.join(rootDir, "Levels", safeId);
}

function draftPath(levelId) {
  return path.join(levelDir(levelId), "walkpath.draft.json");
}

function levelPath(levelId) {
  return path.join(levelDir(levelId), "level.js");
}

function validateWalkPath(value) {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error("walkPath must be an array with at least two points.");
  }

  return value.map((point, index) => {
    if (!point || typeof point !== "object" || Array.isArray(point)) {
      throw new Error(`walkPath[${index}] must be an object.`);
    }
    if (typeof point.id !== "string" || !point.id.trim()) {
      throw new Error(`walkPath[${index}].id must be a non-empty string.`);
    }
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new Error(`walkPath[${index}] must have numeric x and y.`);
    }

    const next = {
      id: point.id,
      x: Math.round(point.x),
      y: Math.round(point.y)
    };
    if (point.role) next.role = String(point.role);
    return next;
  });
}

function escapeString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatWalkPath(walkPath) {
  const lines = walkPath.map((point) => {
    const role = point.role ? `, role: "${escapeString(point.role)}"` : "";
    return `    { id: "${escapeString(point.id)}", x: ${point.x}, y: ${point.y}${role} }`;
  });
  return `walkPath: [\n${lines.join(",\n")}\n  ]`;
}

function findWalkPathRange(source) {
  const keyIndex = source.indexOf("walkPath:");
  if (keyIndex === -1) throw new Error("level.js does not contain walkPath.");

  const start = source.indexOf("[", keyIndex);
  if (start === -1) throw new Error("walkPath does not contain an array.");

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return { start: keyIndex, end: index + 1 };
      }
    }
  }

  throw new Error("walkPath array was not closed.");
}

function applyWalkPathToLevel(levelId, walkPath) {
  const filePath = levelPath(levelId);
  const source = fs.readFileSync(filePath, "utf8");
  const range = findWalkPathRange(source);
  const updated = `${source.slice(0, range.start)}${formatWalkPath(walkPath)}${source.slice(range.end)}`;
  fs.writeFileSync(filePath, updated);
}

async function handleDevRequest(request, response, url) {
  if (url.pathname === "/__dev/status") {
    sendJson(response, 200, { ok: true, feature: "walkpath-editor" });
    return true;
  }

  const match = url.pathname.match(/^\/__dev\/levels\/([^/]+)\/(walkpath-draft|apply-walkpath)$/);
  if (!match) return false;

  const [, levelId, action] = match;
  const folder = levelDir(levelId);
  if (!folder.startsWith(path.join(rootDir, "Levels") + path.sep) || !fs.existsSync(folder)) {
    sendJson(response, 404, { error: "Level not found." });
    return true;
  }

  try {
    if (request.method === "GET" && action === "walkpath-draft") {
      const filePath = draftPath(levelId);
      if (!fs.existsSync(filePath)) {
        sendJson(response, 200, { walkPath: null });
        return true;
      }
      sendJson(response, 200, JSON.parse(fs.readFileSync(filePath, "utf8")));
      return true;
    }

    if (request.method === "DELETE" && action === "walkpath-draft") {
      const filePath = draftPath(levelId);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      sendJson(response, 200, { ok: true });
      return true;
    }

    if (request.method === "POST") {
      const body = JSON.parse(await readBody(request) || "{}");
      const walkPath = validateWalkPath(body.walkPath);

      if (action === "walkpath-draft") {
        fs.writeFileSync(draftPath(levelId), JSON.stringify({
          levelId,
          updatedAt: new Date().toISOString(),
          walkPath
        }, null, 2));
        sendJson(response, 200, { ok: true, draft: true });
        return true;
      }

      if (action === "apply-walkpath") {
        applyWalkPathToLevel(levelId, walkPath);
        const filePath = draftPath(levelId);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        sendJson(response, 200, { ok: true, applied: true });
        return true;
      }
    }

    sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
  return true;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  return "application/octet-stream";
}

function serveStatic(response, url) {
  const decoded = decodeURIComponent(url.pathname);
  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  const filePath = path.resolve(rootDir, relative);
  if (!filePath.startsWith(rootDir + path.sep)) {
    sendText(response, 403, "Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(response, 404, "Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": contentType(filePath),
    "cache-control": "no-store"
  });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (await handleDevRequest(request, response, url)) return;
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method not allowed");
    return;
  }
  serveStatic(response, url);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`SvenAdventure dev server: http://127.0.0.1:${port}/?dev=walkpath`);
});
