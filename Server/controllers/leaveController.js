import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';


const addLeave = async (req, res) => {
   try{
          const { userId, leaveType, startDate, endDate, reason } = req.body;
         const employee= await Employee.findById(userId);
          if(!employee){
              return res.status(404).json({ message: 'Employee not found' });
          }
          const newLeave = new Leave({
              employeeId: userId,
              leaveType,
              startDate,
              endDate,
              reason
          });
          await newLeave.save();
  
           return res.status(201).json({ message: 'Leave added successfully', leave: newLeave });
      } catch (error) {
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }
}

const getLeave= async (req, res) => {
    try {
        const { id} = req.params;
        let leave = await Leave.find({ employeeId: id })
        if (!leave || leave.length === 0) {
        const employee= await Employee.findOne({userId: id});
        const leaves = await Leave.find({ employeeId: employee._id })
        }
        return res.status(200).json({ success: true, leaves });
    
      }
        catch (error) {
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }
}

const getLeaves= async (req, res) => {
    try {
        const leaves = await Leave.find().populate({ path: "employeeId",
        populate: { path: "userId", select: "name" },
        populate: { path: "department", select: "dept_name" }
         });
        return res.status(200).json({ success: true, leaves });
    
      }
        catch (error) {
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }

}

const getLeaveDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const leaves = await Leave.findById({_id: id}).populate({ path: "employeeId",
        populate: { path: "userId", select: "name", profileImage},
        populate: { path: "department", select: "dept_name" }
         });
        return res.status(200).json({ success: true, leaves });
    
      }
        catch (error) {
            console.log(error.message);
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }

}

const updateLeaveStatus = async (req, res) => {
    try{
        const { id } = req.params;
        const leave = await Leave.findByIdAndUpdate({_id: id}, { status: req.body.status });
        if (!leave) {
            return res.status(404).json({ message: 'Leave not found' });
        }
        return res.status(200).json({ success: true, leave });
    }
    catch (error) {
            console.log(error.message);
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeaveStatus };