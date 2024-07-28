const express = require("express");
const path = require("path");
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

const publicDirectory = path.join(__dirname, "./public");

app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

app.use(express.json());

app.get("/", (req, res) => {
  //   res.send("<h1>Home page</h1>");

  res.render("index");
});

app.listen(process.env.PORT || 5100, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
