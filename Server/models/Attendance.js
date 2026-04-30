import mongoose from "mongoose";
const { Schema } = mongoose;

const attendanceSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true }, 
  status: {
    type: String,
    enum: ["present", "absent", "sick", "leave"],
    required: true,
  },
});

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);