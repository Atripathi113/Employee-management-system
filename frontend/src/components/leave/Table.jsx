import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utilities/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [loading, setLoading] = useState(true);  

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const empData = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department?.dept_name,
          days: new Date(leave.endDate).getDate() - new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));
        setLeaves(empData);
        setFilteredLeaves(empData);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (input) => {
    setFilteredLeaves(
      leaves.filter((leave) =>
        leave.employeeId.toString().toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const filterByButton = (status) => {
    setFilteredLeaves(
      leaves.filter((leave) => leave.status.toLowerCase() === status.toLowerCase())
    );
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search By Emp Id"
          className="px-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-teal-500"
          onChange={(e) => filterByInput(e.target.value)}
        />

        <div className="flex gap-2">
          {["Pending", "Approved", "Rejected"].map((status) => (
            <button
              key={status}
              onClick={() => filterByButton(status)}
              className={`px-3 py-1.5 rounded-md text-white text-sm font-medium transition ${
                status === "Pending"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : status === "Approved"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {status}
            </button>
          ))}
          <button
            onClick={() => setFilteredLeaves(leaves)}
            className="px-3 py-1.5 rounded-md text-white text-sm font-medium bg-teal-600 hover:bg-teal-700 transition"
          >
            All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <DataTable
          columns={columns}
          data={filteredLeaves}
          pagination
          highlightOnHover
          striped
          noDataComponent={<p className="py-6 text-gray-500">No leave records found.</p>}
        />
      </div>
    </div>
  );
};

export default Table;