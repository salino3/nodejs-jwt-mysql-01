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

// Parse URL-encoded bodies (as sent by HMTL forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.set("view engine", "hbs");

// Define Routes
app.use("/users", require("./routes/pages"));

app.use("/auth", require("./routes/auth"));

app.listen(process.env.PORT || 5100, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
