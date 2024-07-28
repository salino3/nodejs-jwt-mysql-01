const { db } = require("../db");
const jwt = require("jsonwebtoken");
const bcript = require("bcryptjs");

exports.register = async (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  if (password !== passwordConfirm) {
    // res.status(400).send("Passwords do not match");
    return res.render("register", {
      message: "Passwords do not match",
    });
  }
  if (!name) {
    return res.status(400).send("Name is required");
  }
  if (!email) {
    return res.status(400).send("Email is required");
  }
  if (!password || !passwordConfirm) {
    return res.status(400).send("Password and confirm password are required");
  }

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error in database query");
      }
      if (results?.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      }

      let hashPassword = await bcript.hash(password, 8);
      console.log("hashPassword", hashPassword);

      db.query(
        "INSERT INTO users SET ?",
        {
          name,
          email,
          password: hashPassword,
        },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            console.log(result);
            res.render("register", {
              message: "User registered!",
            });
          }
        }
      );
    }
  );
};
