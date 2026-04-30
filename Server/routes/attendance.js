import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getAttendance, markAttendance, getAttendanceReport } from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/", authMiddleware, getAttendance);
router.post("/mark", authMiddleware, markAttendance);
router.get("/report", authMiddleware, getAttendanceReport);

export default router;