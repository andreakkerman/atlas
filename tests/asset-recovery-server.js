const http = require('http');

// WebKit native media bypasses Playwright routing. Proxy the existing asset
// server so image and native Audio requests receive the same real HTTP faults.
async function createRecoveryServer(upstream) {
  const handlers = new Map();
  const server = http.createServer((request, response) => {
    const forward = () => new Promise(resolve => {
      const target = new URL(request.url, upstream);
      const outgoing = http.request(target, { method: request.method, headers: { ...request.headers, host: target.host } }, incoming => {
        response.writeHead(incoming.statusCode, incoming.headers);
        incoming.pipe(response); incoming.on('end', resolve);
      });
      outgoing.on('error', () => { response.writeHead(502); response.end(); resolve(); });
      request.pipe(outgoing);
    });
    const handler = handlers.get(new URL(request.url, 'http://localhost').pathname);
    const task = handler ? handler({
      fulfill: ({ status, body }) => { response.writeHead(status, { 'Cache-Control': 'no-store' }); response.end(body); },
      continue: forward
    }) : forward();
    Promise.resolve(task).catch(() => { if (!response.headersSent) response.writeHead(500); response.end(); });
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return {
    url: `http://127.0.0.1:${server.address().port}`,
    route: (path, handler) => handlers.set(path, handler),
    close: () => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); })
  };
}
module.exports = { createRecoveryServer };
