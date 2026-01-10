import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRouter from "./routes/auth.js";

import { connect } from "http2";
import connectToDatabase from "./config/db.js"
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
dotenv.config();
connectToDatabase();
const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public/uploads'));
app.use('/api/auth', authRouter);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
// MongoDB connection (example)
/*mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
  
}).then(() => console.log(" MongoDB connected"))
  .catch(err => console.error(" MongoDB connection error:", err));*/

// Example route
app.get("/", (req, res) => {
  res.send("Server is running ");
});

// Server start
 const PORT = process.env.PORT || 5000;
;
app.listen(PORT, () => console.log(` Server started on port ${PORT}`));
