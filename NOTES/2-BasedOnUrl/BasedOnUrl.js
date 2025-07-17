const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT;
const server = http.createServer((req, res) => {
  console.log("res.url");
  console.log(req.url);
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>HOME PAGE</title></head>");
    res.write("<body>HEY THIS IS HOMEPAGE</body>");
    res.write("</html>");
    res.end();
  } else if (req.url === "/products") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>PRODUCTS PAGE</title></head>");
    res.write("<body>HEY THIS IS PRODUCTS PAGE</body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});
