const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  console.log("hiii.....")
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from Authorization header
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, 'my-super-secret-key'); // Verify token
    req.user = decoded; // Attach user info to the request
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticate;
