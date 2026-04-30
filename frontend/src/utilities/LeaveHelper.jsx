import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
  { name: "S.no",       selector: (row) => row.sno,        width: "70px" },
  { name: "Emp ID",     selector: (row) => row.employeeId, sortable: true },
  { name: "Name",       selector: (row) => row.name,       sortable: true },
  { name: "Department", selector: (row) => row.department, sortable: true },
  { name: "Leave Type", selector: (row) => row.leaveType,  sortable: true },
  { name: "Days",       selector: (row) => row.days },
  { name: "Status",     selector: (row) => row.status },
  { name: "Action",     selector: (row) => row.action , width: "220px" },
];

export const getLeaves = async () => {
  let leaves = [];
  try {
    const response = await axios.get("http://localhost:5000/api/leave", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (response.data.success) {
      let sno = 1;
      leaves = response.data.leaves.map((leave) => ({
        _id: leave._id,
        sno: sno++,
        employeeId: leave.employeeId?.employeeId,
        name: leave.employeeId?.userId?.name,
        department: leave.employeeId?.department?.dept_name,
        leaveType: leave.leaveType,
        days: Math.ceil(
          (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)
        ) + 1,
        status: leave.status,
        action: <LeaveButtons Id={leave._id} />,
      }));
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.message);
    }
  }
  return leaves;
};

export const LeaveButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-1">
      <button
        className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
        onClick={() => navigate(`/admin-dashboard/leaves/${Id}`)}
      >
        View
      </button>
      <button
        className="px-2 py-1 bg-green-600 text-white rounded text-xs"
        onClick={() => navigate(`/admin-dashboard/leaves/${Id}`)}
      >
        Approve
      </button>
      <button
        className="px-2 py-1 bg-red-600 text-white rounded text-xs"
        onClick={() => navigate(`/admin-dashboard/leaves/${Id}`)}
      >
        Reject
      </button>
    </div>
  );
};