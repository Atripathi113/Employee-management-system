import Leave from '../models/Leave.js';

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

const getLeaves= async (req, res) => {
    try {
        const { Id } = req.params;
        const employee= await Employee.findOne({userId: Id});
        const leaves = await Leave.find({ employeeId: employee._id })
        return res.status(200).json({ success: true, leaves });
    
      }
        catch (error) {
          
         return res.status(500).json({ message: 'Error adding leave', error });
  
      }
}

export { addLeave, getLeaves };