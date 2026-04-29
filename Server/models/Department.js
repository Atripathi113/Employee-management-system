import mongoose from "mongoose";
import Employee from "./Employee";
import Leave from "./Leave";
import Salary from "./Salary.js"

const departmentSchema = new mongoose.Schema({
    dept_name: {type: String,required: true},
    dept_desc: {type: String, required: false},
        createdAt: { type: Date, default: Date.now},
        updatedAt: { type: Date, default: Date.now} 
});
  departmentSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
      const employees = await Employee.find({department: this._id})
      const empIds = employees.map(emp=> emp._id)

      await Employee.deleteMany({department: this._id})
      await Leave.deleteMany({department: this._id})
      await Salary.deleteMany({department: this._id})
    next()
    }catch(error){
        next(error)
    }
    

  })

const Department = mongoose.model("Department", departmentSchema);
export default Department;
 