const User=require("../models/user.model")
const bcrypt=require("bcryptjs")

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

module.exports = { signUp };