const { createServer } = require("node:http");
const url = require("url");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = 3000;

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

const server = createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);
  const filePath = pathname === "/" ? "./index.html" : `.${pathname}.html`;

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write(page404);
      return res.end();
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
