const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
// create a user using POST "/api/auth". Doesnt require auth
const { body, validationResult } = require("express-validator");
router.post(
  "/",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Should be valid email").isEmail(),
    body("password", "password must contain at least 5 letters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((error) => {
        console.log(error);
        res.json({
          note: "please enter unique value",
        });
      });
  }
);

module.exports = router;
