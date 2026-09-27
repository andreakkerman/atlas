// This directory is the entire application. No Atlas server or application imports.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.jpg':'image/jpeg','.png':'image/png','.json':'application/json' };
http.createServer((req,res) => {
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400).end(); return; }
  const file = path.resolve(root, '.' + pathname + (pathname.endsWith('/') ? 'index.html' : ''));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.stat(file,(err,stat) => {
    if (err || !stat.isFile()) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200,{'content-type':types[path.extname(file)] || 'application/octet-stream','content-length':stat.size,'cache-control':'no-cache'});
    if (req.method === 'HEAD') res.end();
    else fs.createReadStream(file).on('error',()=>res.destroy()).pipe(res);
  });
}).listen(Number(process.env.PORT || 4186),'127.0.0.1',()=>console.log('Atlas reveal lab: http://127.0.0.1:'+(process.env.PORT || 4186)));
