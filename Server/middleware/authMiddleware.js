import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

     req.user = { ...user._doc, userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    // Handle JWT-specific errors with 401 instead of 500
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token." });
    }

    // Only truly unexpected errors should be 500
    console.error("Auth middleware error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export default authMiddleware;