import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ================= ADD EMPLOYEE =================
const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      employeeId,
      maritalStatus,
      dob,
      gender,
      designation,
      department,
      salary,
    } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.filename : null,
    });

    const savedUser = await newUser.save();

    const employee = new Employee({
      userId: savedUser._id,
      employeeId, // ✅ fixed typo
      maritalStatus,
      dob,
      gender,
      designation,
      department,
      salary,
    });

    const savedEmployee = await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= GET ALL =================
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department")
      .populate("userId", "name email profileImage");

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= GET ONE =================
const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id)
      .populate("department")
      .populate("userId", { password: 0 });

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= UPDATE =================
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Associated user not found",
      });
    }

    // ✅ FIX: use User model, not user instance
    await User.findByIdAndUpdate(employee.userId, { name });

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { maritalStatus, designation, department, salary },
      { new: true }
    )
      .populate("department")
      .populate("userId", "name email profileImage");

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ================= FETCH BY DEPARTMENT =================
const fetchEmployeesByDeptId = async (req, res) => {
  const { id } = req.params;

  try {
    const employees = await Employee.find({ department: id })
      .populate("department")
      .populate("userId", { password: 0 });

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({
      success: false,
      message: "Get Employees by Department ID Error",
    });
  }
};

// ================= EXPORT =================
export {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeesByDeptId,
};