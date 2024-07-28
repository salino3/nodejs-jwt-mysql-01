const express = require("express");
const dotenv = require("dotenv");
const { db } = require("./db");

const app = express();

dotenv.config();

db.connect((err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("MySQL connection established!");
  }
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Home page</h1>");
});

app.listen(process.env.PORT || 5100, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
