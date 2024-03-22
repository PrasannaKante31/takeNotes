const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "iAm1ofMyKind";
const fetchUser = require("../middleware/fetchUser.js");
//ROUTE 1: create a user using POST "/api/auth/createUser". Doesnt require auth
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Should be valid email").isEmail(),
    body("password", "password must contain at least 5 letters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors then return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user exists already
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ error: "email already in use" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured");
    }
  }
);

//ROUTE 2: login using POST "/api/auth/login". Doesnt require login
router.post(
  "/login",
  [
    body("email", "Should be valid email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // if there are errors then return bad request and errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ error: "Try to login with correct credentials" });
      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare)
        return res
          .status(400)
          .json({ error: "Try to login with correct credentials" });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      res.json(authToken);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured");
    }
  }
);

//ROUTE 3: get logged in user details POST "/api/auth/getuser". requires login

router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    // gives user without displaying the password
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("some error occured");
  }
});

module.exports = router;
