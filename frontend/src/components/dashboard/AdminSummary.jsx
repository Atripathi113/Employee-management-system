import React, { useEffect, useState } from "react";
import {
  FaBuilding, FaCheckCircle, FaFileAlt,
  FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers,
} from "react-icons/fa";
import axios from "axios";

const SummaryCard = ({ icon, text, number, color }) => (
  <div className={`${color} rounded-xl p-4 flex items-center gap-4`}>
    <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center text-white text-lg flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-white/70 text-xs mb-0.5">{text}</p>
      <p className="text-white text-2xl font-medium">{number}</p>
    </div>
  </div>
);

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setSummary(res.data);
      } catch (error) {
        if (error.response) alert(error.response.data.error);
        console.log(error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) return (
    <div className="flex items-center justify-center h-40 text-gray-400">
      Loading...
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h3 className="text-xl font-medium text-white">Dashboard overview</h3>
      <p className="text-gray-500 text-sm mt-1 mb-6">Welcome back, Admin</p>

      {/* Organisation */}
      <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-3">
        Organisation
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <SummaryCard icon={<FaUsers />}         text="Total Employees"   number={summary.totalEmployees}   color="bg-teal-700" />
        <SummaryCard icon={<FaBuilding />}       text="Total Departments" number={summary.totalDepartments} color="bg-yellow-800" />
        <SummaryCard icon={<FaMoneyBillWave />}  text="Total Salaries"    number={summary.totalSalaries}    color="bg-red-800" />
      </div>

      <hr className="border-gray-700 mb-5" />

      {/* Leave Details */}
      <p className="text-gray-500 text-xs font-medium uppercase tracking-widest mb-3">
        Leave details
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <SummaryCard icon={<FaFileAlt />}       text="Leave Applied"  number={summary.leaveSummary.appliedFor} color="bg-teal-700" />
        <SummaryCard icon={<FaCheckCircle />}   text="Leave Approved" number={summary.leaveSummary.approved}  color="bg-green-800" />
        <SummaryCard icon={<FaHourglassHalf />} text="Leave Pending"  number={summary.leaveSummary.pending}   color="bg-yellow-800" />
        <SummaryCard icon={<FaTimesCircle />}   text="Leave Rejected" number={summary.leaveSummary.rejected}  color="bg-red-800" />
      </div>
    </div>
  );
};

export default AdminSummary;