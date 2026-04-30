import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Add = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [leave, setLeave] = useState({
    userId: user._id,       // user is guaranteed by ProtectedRoute, safe to access directly
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fix 2: date validation
    if (new Date(leave.startDate) > new Date(leave.endDate)) {
      alert("Start date cannot be after end date.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/employee-dashboard/leaves/${user._id}`);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-teal-600 px-8 py-5">
          <h2 className="text-xl font-bold text-white text-center">Request for Leave</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-8 flex flex-col space-y-5">

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">
              Reason
            </label>
            {/* Fix 3: added value prop — now fully controlled */}
            <textarea
              name="reason"
              value={leave.reason}
              placeholder="Enter reason for leave"
              onChange={handleChange}
              rows={4}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-2.5 focus:outline-none focus:border-teal-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200"
          >
            Add Leave
          </button>

        </form>
      </div>
    </div>
  );
};

export default Add;