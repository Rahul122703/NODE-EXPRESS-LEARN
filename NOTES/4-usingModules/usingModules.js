const fs = require("fs");

const userRequestHandler = (req, res) => {
  console.log(req.method, req.url);

  // Route: GET /
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Form Page</title></head>");
    res.write("<body>");
    res.write("<h1>Submit Your Info</h1>");
    res.write(`
      <form action="/submit-details" method="POST">
        <label>Name: <input type="text" name="name" /></label><br />
        <label>Email: <input type="email" name="email" /></label><br />
        <label>Age: <input type="number" name="age" /></label><br />
        <button type="submit">Submit</button>
      </form>
    `);
    res.write("</body>");
    res.write("</html>");
    res.end();

    // Route: POST /submit-details
  } else if (req.method === "POST" && req.url === "/submit-details") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const parsedData = new URLSearchParams(body);
      const name = parsedData.get("name");
      const email = parsedData.get("email");
      const age = parsedData.get("age");

      const userDetails = `Name: ${name}\nEmail: ${email}\nAge: ${age}\n\n`;

      // Save to file (append or create)
      fs.appendFile("user-details.txt", userDetails, (err) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "text/html");
          res.end("<h1>Internal Server Error</h1>");
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          res.write("<html>");
          res.write("<head><title>Submission Received</title></head>");
          res.write("<body>");
          res.write("<h1>Thank you for submitting your data!</h1>");
          res.write(`<p>Name: ${name}</p>`);
          res.write(`<p>Email: ${email}</p>`);
          res.write(`<p>Age: ${age}</p>`);
          res.write("<hr>");
          res.write(`<a href="/">Go Back</a>`);
          res.write("</body>");
          res.write("</html>");
          res.end();
        }
      });
    });

    // All other routes
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>404 - Page Not Found</h1>");
  }
};

module.exports = userRequestHandler;
