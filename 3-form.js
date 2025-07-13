const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  // Route: GET /
  if (req.method === "GET" && req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Form Page</title></head>");
    res.write("<body>");
    res.write("<h1>Submit Your Info</h1>");
    res.write(`
      <form action="/data" method="POST">
        <label>Name: <input type="text" name="name" /></label><br />
        <label>Email: <input type="email" name="email" /></label><br />
        <label>Age: <input type="number" name="age" /></label><br />
        <button type="submit">Submit</button>
      </form>
    `);
    res.write("</body>");
    res.write("</html>");
    res.end();

    // Route: POST /data
  } else if (req.method === "POST" && req.url === "/data") {
    let body = "";

    // Read data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // After all data is received
    req.on("end", () => {
      // Parse URL-encoded form data
      const parsedData = new URLSearchParams(body);
      const name = parsedData.get("name");
      const email = parsedData.get("email");
      const age = parsedData.get("age");

      console.log("Form Submitted:");
      console.log("Name:", name);
      console.log("Email:", email);
      console.log("Age:", age);

      // Respond to the client
      res.setHeader("Content-Type", "text/html");
      res.write("<html>");
      res.write("<head><title>Submission Received</title></head>");
      res.write("<body>");
      res.write("<h1>Thank you for submitting your data!</h1>");
      res.write(`<p>Name: ${name}</p>`);
      res.write(`<p>Email: ${email}</p>`);
      res.write(`<p>Age: ${age}</p>`);
      res.write("</body>");
      res.write("</html>");
      res.end();
    });

    // 404 for other routes
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><h1>404 - Page Not Found</h1></body></html>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
