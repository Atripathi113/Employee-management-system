import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDb from "./config/db.js"; 

const userRegister = async () => {
  await connectDb();
  try {
    const existingUser = await User.findOne({ email: "admin@gmail.com" });
    if (existingUser) {
      console.log(" Admin user already exists!");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      username: "admin",  
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    console.log(" Admin created successfully!");
    process.exit(0);
  } catch (error) {
    console.error(" Error creating admin:", error);
    process.exit(1);
  }
};

userRegister();

