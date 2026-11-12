const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
  // get token from request headers
  const authHeader=req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
          return res.status(401).json({
        success: false,
        message: "Token missing. Please login first.",
      });
      // exact token
       const token =authHeader.split(" ")[1];
    }
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
