const https = require("http");
const server = https.createServer((req, res) => {
  console.log(req);
});
server.listen(9999);
