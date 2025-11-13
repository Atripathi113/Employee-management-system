import User from '../models/User.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = 
 async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found for:", email);
      return res.status(400).json({ message: "User not found" });
    }

    console.log("✅ User found:", user.email, "Stored hash:", user.password);

    if (!password || !user.password) {
      console.log("⚠️ Missing data or hash", password, user.password);
      return res.status(400).json({ message: "Invalid login data" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};/*async(req,res)=>{
    // Login logic here
    try{
        const {email,password}=req.body;
        const user = await User
        // Validate user credentials (this is just a placeholder, implement your own logic)
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        } const match = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        const token = jwt.sign({userId:user._id,role:user.role},process.env.JWT_SECRET,{
            expiresIn:"1h",
        });
        res.status(200).json({sucess: ture , token,user:{id:user._id,username:user.username,email:user.email,role:user.role}});
        
}catch(error){
    console.error("Login error:",error);
    res.status(500).json({success:false, message:"Server error"});
}}*/
const verify = (req,res) => {
   return res.status(200).json({success:true, user:req.user});
}
export {login,verify};