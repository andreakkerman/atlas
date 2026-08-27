// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const runtimeUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(root, "index.html")).toString();
const fileDevUrl = `${pathToFileURL(path.join(root, "index.html"))}?dev=editor`;

async function showMenu(page) {
  await page.evaluate(() => {
    window.eval("state = { screen: 'menu', menuHeroIndex: 0 }");
    window.eval("render")();
  });
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
}

test.afterEach(async ({ page }) => {
  await page.goto("about:blank");
});

test("shows the reset only on the exact 127.0.0.1 hostname", async ({ page }) => {
  const url = new URL(runtimeUrl);
  test.skip(url.hostname !== "127.0.0.1", "Requires the local HTTP server for the positive visibility assertion.");

  await page.goto(runtimeUrl);
  await showMenu(page);
  await expect(page.getByRole("button", { name: "Reset local Atlas data", exact: true })).toBeVisible();

  const hostnameMatrix = await page.evaluate(() => {
    const available = window.eval("localAtlasResetAvailable");
    return {
      loopback: available({ hostname: "127.0.0.1" }),
      production: available({ hostname: "svenakkerman.nl" }),
      lan: available({ hostname: "192.168.1.45" }),
      localhost: available({ hostname: "localhost" })
    };
  });
  expect(hostnameMatrix).toEqual({ loopback: true, production: false, lan: false, localhost: false });

  const serviceWorkerBoundary = await page.evaluate(async () => {
    const container = navigator.serviceWorker;
    const hadOwnMethod = Object.prototype.hasOwnProperty.call(container, "getRegistrations");
    const ownMethod = hadOwnMethod ? container.getRegistrations : null;
    const calls = [];
    const registration = (scriptURL, id) => ({
      active: { scriptURL },
      unregister: async () => {
        calls.push(id);
        return true;
      }
    });
    Object.defineProperty(container, "getRegistrations", {
      configurable: true,
      value: async () => [
        registration(`${location.origin}/service-worker.js`, "atlas"),
        registration(`${location.origin}/other-worker.js`, "same-origin-other"),
        registration("https://example.com/service-worker.js", "other-origin")
      ]
    });
    try {
      return { count: await window.eval("unregisterLocalAtlasServiceWorkers")(), calls };
    } finally {
      if (hadOwnMethod) {
        Object.defineProperty(container, "getRegistrations", { configurable: true, value: ownMethod });
      } else {
        delete container.getRegistrations;
      }
    }
  });
  expect(serviceWorkerBoundary).toEqual({ count: 1, calls: ["atlas"] });

  const localhostUrl = new URL(runtimeUrl);
  localhostUrl.hostname = "localhost";
  localhostUrl.searchParams.set("dev", "editor");
  await page.goto(localhostUrl.toString());
  await showMenu(page);
  await expect(page.getByRole("button", { name: "Reset local Atlas data", exact: true })).toHaveCount(0);

  await page.goto(fileDevUrl);
  await showMenu(page);
  await expect(page.getByRole("button", { name: "Reset local Atlas data", exact: true })).toHaveCount(0);
});

test("confirms, clears only Atlas-owned state and caches, then reloads cleanly", async ({ page }) => {
  const url = new URL(runtimeUrl);
  test.skip(url.hostname !== "127.0.0.1", "Requires the local HTTP server for cache and reload coverage.");
  const messages = [];
  page.on("console", (message) => {
    if (message.type() === "error") messages.push(message.text());
  });

  const devUrl = new URL(runtimeUrl);
  devUrl.searchParams.set("dev", "editor");
  await page.goto(devUrl.toString());
  await showMenu(page);
  await page.evaluate(async () => {
    localStorage.setItem("svenadventure-runenpoort-v1", JSON.stringify({ completedRuneIds: ["zon"] }));
    localStorage.setItem("atlas.graphics.v1", JSON.stringify({ renderer: "voxel" }));
    localStorage.setItem("lvl-0021-progress", JSON.stringify({ completedAt: "seeded" }));
    localStorage.setItem("other-app-preference", "keep-local");
    sessionStorage.setItem("atlas-session-current-v1", "seeded-session");
    sessionStorage.setItem("other-session-preference", "keep-session");
    await caches.open("svenadventure-reset-fixture");
    await caches.open("other-app-reset-fixture");
  });

  const reset = page.getByRole("button", { name: "Reset local Atlas data", exact: true });
  const cancelledDialog = page.waitForEvent("dialog");
  const cancelledClick = reset.click();
  const cancelled = await cancelledDialog;
  expect(cancelled.message()).toBe(
    "Reset local Atlas data?\n\nThis removes local progress and cached development data, then reloads Atlas."
  );
  await cancelled.dismiss();
  await cancelledClick;
  expect(await page.evaluate(() => localStorage.getItem("svenadventure-runenpoort-v1"))).not.toBeNull();

  page.once("dialog", (dialog) => dialog.accept());
  const reloaded = page.waitForNavigation({ waitUntil: "domcontentloaded" });
  await reset.click();
  await reloaded;

  const cleared = await page.evaluate(async () => ({
    progress: localStorage.getItem("svenadventure-runenpoort-v1"),
    graphics: localStorage.getItem("atlas.graphics.v1"),
    levelProgress: localStorage.getItem("lvl-0021-progress"),
    atlasSession: sessionStorage.getItem("atlas-session-current-v1"),
    unrelatedLocal: localStorage.getItem("other-app-preference"),
    unrelatedSession: sessionStorage.getItem("other-session-preference"),
    caches: await caches.keys()
  }));
  expect(cleared).toMatchObject({
    progress: null,
    graphics: null,
    levelProgress: null,
    atlasSession: null,
    unrelatedLocal: "keep-local",
    unrelatedSession: "keep-session"
  });
  expect(cleared.caches).not.toContain("svenadventure-reset-fixture");
  expect(cleared.caches).toContain("other-app-reset-fixture");
  await expect(page.getByRole("button", { name: "Start avontuur", exact: true })).toBeVisible();
  expect(messages).toEqual([]);

  await page.evaluate(async () => {
    localStorage.removeItem("other-app-preference");
    sessionStorage.removeItem("other-session-preference");
    await caches.delete("other-app-reset-fixture");
  });
});
