import User from '../models/User.js';
import Employee from '../models/Employee.js';   
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Fix: moved token generation after null check (it was before in original)
    let employeeId = null;
    if (user.role === "employee") {
      const employee = await Employee.findOne({ userId: user._id });
      employeeId = employee?._id;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: employeeId || user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const verify = async (req, res) => {   
  try {
    const user = await User.findById(req.user.userId).select("-password");

    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let employeeId = null;
    if (user.role === "employee") {
      const employee = await Employee.findOne({ userId: user._id });
      employeeId = employee?._id;
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: employeeId || user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      }
    });

  } catch (error) {
    console.error("Verify error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { login, verify };