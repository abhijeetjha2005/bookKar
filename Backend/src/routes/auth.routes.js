const express =require("express");
const router=express.Router();

const {signUp,login,getMyProfile,logout }=require("../controller/auth.controller")
const {protect}=require("../middleware/auth.middlewar")

router.post("/signup",signUp);
router.post("/login",login);
router.post("/logout",logout)



// protected route
router.get("/profile", protect, getMyProfile);


module.exports=router;