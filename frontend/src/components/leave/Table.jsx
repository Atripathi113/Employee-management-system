import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { columns, LeaveButtons } from '../../utilities/LeaveHelper';
import axios from 'axios';

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leave",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;

        const empData = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department?.dept_name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
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
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (input) => {
    const filteredData = leaves.filter((leave) =>
      leave.employeeId.toString().toLowerCase().includes(input.toLowerCase())
    );
    setFilteredLeaves(filteredData);
  };

  const filterByButton = (status) => {
    const filteredData = leaves.filter(
      (leave) => leave.status.toLowerCase() === status.toLowerCase()
    );
    setFilteredLeaves(filteredData);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-1 border"
              onChange={(e) => filterByInput(e.target.value)}
            />

            <div>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>

              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>

              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-4">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
            />
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Loading...</p>
      )}
    </>
  );
};

export default Table;