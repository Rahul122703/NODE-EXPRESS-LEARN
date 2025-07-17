require("dotenv").config();

const PORT = process.env.PORT;

const practiceset4 = require("../NOTES/4-usingModules/praticeset");

const http = require("http");
const server = http.createServer(practiceset4);

server.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
