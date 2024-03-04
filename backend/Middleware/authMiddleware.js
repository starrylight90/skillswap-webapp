import  {verifyToken}  from "../utils/jwtUtils.js";

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  console.log('Received Token:', token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const decodedToken = verifyToken(token);
  console.log('Decoded Token:', decodedToken);
  if (!decodedToken) {
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  // Attach user information to the request
  req.user = decodedToken;
  next();
};

export default authenticateToken;
