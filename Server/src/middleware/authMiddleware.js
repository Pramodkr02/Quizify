import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    // Get token from cookie, header, or query
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.split(" ")[1] ||
      req.query?.token;

    if (!token) {
      return res.status(401).json({
        message: "No token provided. Please login.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);

    req.userId = decoded.id; // attach user id to request
    next(); // go to next middleware/controller
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token. Please login again.",
    });
  }
};

export default auth;
