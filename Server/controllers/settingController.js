import User from "../models/User.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
    try {
        const {userId,oldPassword, newPassword } = req.body;
        const user=await User.findById({ _id: userId });
        if(!user){
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid current password" });
          }
          const hashpassword = await bcrypt.hash(newPassword, 10);
          const updatedUser = await User.findByIdAndUpdate({ _id: userId },
             { password: hashpassword }, { new: true });
            return res.status(200).json({ success: true, message: 'Password changed successfully', user: updatedUser });
       
    } catch (error) {
       return res.status(500).json({ message: 'Error changing password', error });
    }   
};

export { changePassword };
