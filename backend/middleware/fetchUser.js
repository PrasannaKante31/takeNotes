const jwt = require("jsonwebtoken");
const JWT_SECRET = "iAm1ofMyKind"; // password that only certain people know
const fetchUser = (req, res, next) => {
  // get user from jwt token and is to the req object
  const token = req.header("auth-token");
  if (!token) res.status(401).send({ error: "Please login using valid token" });

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
  } catch (err) {
    res.status(401).send({ error: "some error occured" });
  }
  next();
};
module.exports = fetchUser;
