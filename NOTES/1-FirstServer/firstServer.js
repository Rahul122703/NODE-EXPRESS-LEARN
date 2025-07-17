const https = require("http");
require("dotenv").config();
const PORT = process.env.PORT;
const server = https.createServer((req, res) => {
  //   console.log("req.method");
  //   console.log(req.method);
  //   console.log("req.url");
  //   console.log(req.url);
  //   console.log("req.headers");
  //   console.log(req.headers);

  console.log("res");
  console.log(res);
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Rahul Sharma</title></head>");
  res.write("<body>Hey this is rahul sharma</body>");
  res.write("</html>");
  res.end();
});
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//IN THIS CODE THERES CREATION OF FIRST NODE SERVER UNDERSTANDING REQ AND RES OBJECT
