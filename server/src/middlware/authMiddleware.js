const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  // Check if the Authorization header is present and well-formed
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Extract the token
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
