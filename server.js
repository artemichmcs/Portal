const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'public');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); } catch { res.writeHead(400); return res.end(); }
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(data);
  });
});
let port = Number(process.env.PORT || 3000);
const maxPort = Math.min(port + 20, 65535);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT must be an integer from 1 to 65535.');
  process.exit(1);
}
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE' && port < maxPort) {
    console.log(`Port ${port} is busy. Trying ${port + 1}...`);
    port += 1;
    server.listen(port, '127.0.0.1');
    return;
  }
  console.error(`Cannot start server on port ${port}: ${error.message}`);
  process.exitCode = 1;
});
server.on('listening', () => console.log(`Portal demo: http://localhost:${port}`));
server.listen(port, '127.0.0.1');
