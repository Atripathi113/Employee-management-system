import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const List = () => {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  let sno = 1;

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves || []);
        setFilteredLeaves(response.data.leaves || []);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaves(); }, [id]);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setFilteredLeaves(leaves.filter((leave) =>
      leave.leaveType.toLowerCase().includes(q)
    ));
  };

  const statusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700 border border-green-200";
      case "Rejected": return "bg-red-100 text-red-700 border border-red-200";
      default:         return "bg-yellow-100 text-yellow-700 border border-yellow-200";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6 pb-4 border-b border-gray-200">   
        <h3 className="text-2xl font-bold text-gray-800">My Leaves</h3>
        <p className="text-sm text-gray-400 mt-1">Track your leave requests and their status</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <input
          type="text"
          placeholder="Search by Leave Type..."
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm w-full
           sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"  
        />

        {user?.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white
             text-sm font-semibold rounded-lg transition duration-200 shadow-sm whitespace-nowrap"
          >
            + Add New Leave
          </Link>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">  
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />  
            <p className="text-gray-400 text-sm">Loading leaves...</p>
          </div>
        ) : filteredLeaves.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-gray-400 text-sm">No leave records found.</p>
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 w-16">S No</th>
                <th className="px-6 py-4">Leave Type</th>
                <th className="px-6 py-4">From</th>
                <th className="px-6 py-4">To</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredLeaves.map((leave) => (
                <tr key={leave._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4 text-gray-400 font-medium">{sno++}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">{leave.leaveType}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(leave.status)}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default List;