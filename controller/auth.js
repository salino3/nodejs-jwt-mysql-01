const { db } = require("../db");

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).send("Passwords do not match");
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
  if (!password || !confirmPassword) {
    return res.status(400).send("Password and confirm password are required");
  }

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error in database query");
      }
      if (results?.length > 0) {
        return res.render("register", {
          message: "That email is already in use",
        });
      }
    }
  );

  res.send("Form submitted");
};
