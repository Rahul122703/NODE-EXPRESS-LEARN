require("dotenv").config();

const PORT = process.env.PORT;

const http = require("http");
const server = http.createServer((req, res) => {
  console.log(req);
  console.log(res);
});

server.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
