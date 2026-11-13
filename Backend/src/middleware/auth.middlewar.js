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
    }
      // extract token
       const token =authHeader.split(" ")[1];
      //  verify token
      const decoded=jwt.verify(token,process.env.JWT_SECRET);
      // find user in db
      const user=await User.findById(decoded.id);
      if(!user){
             return res.status(401).json({
        success: false,
        message: "User not found.",
      });

    }
    // attach user to request
    req.user=user;
    // allow request to continue to controller
     next();
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
module.exports={protect}