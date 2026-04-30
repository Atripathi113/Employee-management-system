import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.data.success) setLeave(response.data.leaves);
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
    };
    fetchLeave();
  }, [id]);

  const changeStatus = async (leaveId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${leaveId}`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data.success) navigate("/admin-dashboard/leaves");
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  if (!leave) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400 text-lg animate-pulse">Loading...</p>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* Header Banner */}
      <div className="bg-teal-600 px-8 py-5">
        <h2 className="text-2xl font-bold text-white text-center tracking-wide">
          Leave Request Detail
        </h2>
      </div>

      <div className="p-8">

        {/* Employee Info — top section */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
          <img
            src={`http://localhost:5000/uploads/${leave?.employeeId?.userId?.profileImage}`}
            className="w-24 h-24 rounded-full object-cover border-4 border-teal-100 shadow"
            alt="profile"
          />
          <div>
            <p className="text-xl font-bold text-gray-800">
              {leave?.employeeId?.userId?.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {leave?.employeeId?.department?.dept_name}
            </p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Leave Type</p>
            <p className="text-gray-800 font-medium">{leave.leaveType}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Department</p>
            <p className="text-gray-800 font-medium">{leave?.employeeId?.department?.dept_name}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Start Date</p>
            <p className="text-gray-800 font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">End Date</p>
            <p className="text-gray-800 font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 sm:col-span-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Reason</p>
            <p className="text-gray-800 font-medium">{leave.reason}</p>
          </div>

        </div>

        {/* Status / Action */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              {leave.status === "Pending" ? "Action Required" : "Status"}
            </p>
            {leave.status !== "Pending" && (
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${
                leave.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {leave.status}
              </span>
            )}
          </div>

          {leave.status === "Pending" && (
            <div className="flex gap-3">
              <button
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition duration-200 shadow-sm"
                onClick={() => changeStatus(leave._id, "Approved")}
              >
                Approve
              </button>
              <button
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition duration-200 shadow-sm"
                onClick={() => changeStatus(leave._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LeaveDetail;