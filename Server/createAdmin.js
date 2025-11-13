
import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDb from "./config/db.js";

const createAdmin = async () => {
  await connectDb();

  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("✅ Admin already exists");
      return;
    }

    // create new admin
    const newUser = new User({
      username: "admin",  // ✅ required field
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("🎉 Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();
