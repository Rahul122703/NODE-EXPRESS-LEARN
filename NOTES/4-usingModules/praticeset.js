const addition = require("./calculator");
require("dotenv").config();
const PORT = process.env.PORT;

const practiceset4 = (req, res) => {
  if (req.url == "/" && req.method == "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home page</title></head>");
    res.write("<body>");
    res.write("<h1>Welcome to the calculator basic node js backend app</h1>");
    res.write(`
      <a href = "/calculator"> CLICK HERE TO GO TO CALCULATOR PAGE </a>
    `);
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.url == "/calculator" && req.method == "GET") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Calculator Page</title></head>");
    res.write("<body>");
    res.write("<h1>Submit Arguments </h1>");
    res.write(`
      <form action="/calculator-result" method="POST">
        <label>NUMBER 1: <input type="number" name="number1" /></label><br />
        <label>NUMBER 2: <input type="number" name="number2" /></label><br />
        <button type="submit">Submit</button>
      </form>
    `);
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else if (req.url == "/calculator-result" && req.method == "POST") {
    res.statusCode = 200;
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parsedData = new URLSearchParams(body);
      const number1 = parsedData.get("number1");
      const number2 = parsedData.get("number2");
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Calculator Result Page</title></head>");
      res.write("<body>");
      res.write("<h1>Result</h1>");
      res.write(`
      <h1> THE FINAL ANSWER IS : ${addition(
        Number(number1),
        Number(number2)
      )}</h1>
      <br/>
      <hr/>
      <a href = "/"> Home page </a>
    `);
      res.write("</body>");
      res.write("</html>");
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Page not Found</title></head>");
    res.write("<body>");
    res.write(`
      <h1>Opps seems likle you entred a wrong URL go to <a href = "/"> Home page </a> </h1>
    `);
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
};

module.exports = practiceset4;
