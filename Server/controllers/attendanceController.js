import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";


const getAttendance = async (req, res) => {
  try {
    const { date } = req.query;
    const today = date || new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    const employees = await Employee.find()
      .populate("userId", "name")
      .populate("department", "dept_name");

    const attendanceRecords = await Attendance.find({ date: today });

    const attendanceMap = {};
    attendanceRecords.forEach((record) => {
      attendanceMap[record.employeeId.toString()] = record.status;
    });

    const data = employees.map((emp, index) => ({
      sno: index + 1,
      _id: emp._id,
      employeeId: emp.employeeId,
      name: emp.userId?.name,
      department: emp.department?.dept_name,
      status: attendanceMap[emp._id.toString()] || null, // null = not yet marked
    }));

    return res.status(200).json({ success: true, date: today, attendance: data });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST mark or update attendance for one employee
const markAttendance = async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;

    
    const record = await Attendance.findOneAndUpdate(
      { employeeId, date },
      { status },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, message: "Attendance marked", record });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

  const getAttendanceReport = async (req, res) => {
  try {
    const { date, limit = 5, skip = 0 } = req.query;
    const filterDate = date || new Date().toISOString().split("T")[0];

    const records = await Attendance.find({ date: filterDate })
      .populate({
        path: "employeeId",
        populate: [
          { path: "userId", select: "name" },
          { path: "department", select: "dept_name" },
        ],
      })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Attendance.countDocuments({ date: filterDate });

    const data = records.map((rec, index) => ({
      sno: Number(skip) + index + 1,
      employeeId: rec.employeeId?.employeeId,
      name: rec.employeeId?.userId?.name,
      department: rec.employeeId?.department?.dept_name,
      status: rec.status,
    }));

    return res.status(200).json({ success: true, date: filterDate, report: data, total });
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { getAttendance, markAttendance, getAttendanceReport };