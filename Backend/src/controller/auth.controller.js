const User=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt =require("jsonwebtoken")

const signUp=async(req ,res)=>{
  try{
  const {name,email,password}=req.body;
  // validate input
  if(!name || !email || !password){
    return res.status(400).json({
           success: false,
        message: "All fields are required",
    })
  }
  if(password.length<6){
         return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      }); 
  }
  // chexking existing email
  const existingUser=await User.findOne({
       email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    // hash password
    const hashedPassword=await bcrypt.hash(password,12);
  // create user
  const user=await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
  })
    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }catch(error){
      console.error("Signup Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
// login
const login= async(req,res)=>{
  try{
   const {email , password}=req.body;
  //  validate input
  if(!email || !password){
    return res.status(400)({
      success:false,
      message:"Email and password are required",
    })
  }
      // Find user and retrieve hidden password
      const user=await User.findOne({
        email:email.toLowerCase().trim(),
      }).select("+password")
      if(!user){
             return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      }); 
      }
      // compare password
      const isPasswordCorrect= await bcrypt.compare(
        password,
        user.password
      )
      if(!isPasswordCorrect){
           return res.status(401).json({
        success: false,
        message: "Invalid email or password",
           })
      }
      // genrate jwt token
      const token=jwt.sign({
        
        id:user._id,
        role:user.role,
      },
      process.env.JWT_SECRET,
       {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      }
      )
          return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
  catch(error){
    console.error("Login Error :",error);
    return res.status(500).json({
      success:false,
      message:"Internal server error"
    })
    
  }
}

module.exports = { signUp,login };