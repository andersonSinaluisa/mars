const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Token not provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    if (req.user !== decoded)
      return res.status(401).json({ msg: "Invalid token" });
    next();
  } catch (error) {
    res.status(500).json({ msg: "There was a mistake" });
  }
};
