import Employee from "../models/Employee";
import User from "../models/User";
import bcrypt from "bcryptjs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');},
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname ( file.originalname));}
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
    const {
        name,
        email,
        password,
        role,
        
        employeeld,
        maritalStatus,
        dob,
        gender,
        designation,
        department,
        salary,
    } = req.body;

    const user= await User.findOne({ email });
    if(user){
        return res.status(400).json({ success: false, message: "User with this email already exists" });
    } const hashedPassword = await bcrypt.hash(password, 10); // Implement password hashing here

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
        employeeld,
        maritalStatus,
        dob,
        gender,
        designation,
        department,
        salary
    });

    const savedEmployee = await employee.save();

    res.status(201).json({ success: true, message: "Employee added successfully", employee: savedEmployee });
}catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ success: false, message: "Server Error" });
}};


export { addEmployee , upload};