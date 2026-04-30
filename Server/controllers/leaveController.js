import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;

        
        let employee = await Employee.findById(userId);
        if (!employee) {
            employee = await Employee.findOne({ userId });
        }

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const newLeave = new Leave({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason
        });
        await newLeave.save();
        return res.status(201).json({ success: true, message: 'Leave added successfully', leave: newLeave });
    } catch (error) {
        return res.status(500).json({ message: 'Error adding leave', error });
    }
};

const getLeave = async (req, res) => {
    try {
        const { id, role } = req.params;
        let leaves;

        if (role === "admin") {
            leaves = await Leave.find({ employeeId: id });
        } else {
            leaves = await Leave.find({ employeeId: id });  // ✅ no Employee lookup needed
        }
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching leave', error });
    }
};

const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [
                { path: "userId", select: "name" },
                { path: "department", select: "dept_name" }
            ]
        });
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching leaves', error });
    }
};

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leaves = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [
                { path: "userId", select: "name profileImage" },
                { path: "department", select: "dept_name" }
            ]
        });
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error fetching leave detail', error });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const leave = await Leave.findByIdAndUpdate(id, { status: req.body.status }, { new: true });
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'Error updating leave', error });
    }
};

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeaveStatus };