import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Attendance = () => {
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/attendance?date=${today}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setAttendance(response.data.attendance);
        setFilteredAttendance(response.data.attendance);
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
    fetchAttendance();
  }, []);

  const handleSearch = (e) => {
    const q = e.target.value.toLowerCase();
    setFilteredAttendance(
      attendance.filter((emp) =>
        emp.employeeId?.toLowerCase().includes(q)
      )
    );
  };

  const markAttendance = async (employeeId, status) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/attendance/mark",
        { employeeId, date: today, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        // Update local state immediately without refetching
        setAttendance((prev) =>
          prev.map((emp) =>
            emp._id === employeeId ? { ...emp, status } : emp
          )
        );
        setFilteredAttendance((prev) =>
          prev.map((emp) =>
            emp._id === employeeId ? { ...emp, status } : emp
          )
        );
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Manage Attendance</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          className="px-4 py-1 border border-gray-300 rounded"
          onChange={handleSearch}
        />

        <p className="text-lg font-semibold">
          Mark Attendance for{" "}
          <span className="underline font-bold">{today}</span>
        </p>

        <button
          onClick={() => navigate("/admin-dashboard/attendance-report")}
          className="px-4 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Attendance Report
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Emp Id</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((emp) => (
              <tr key={emp._id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-3">{emp.sno}</td>
                <td className="px-6 py-3">{emp.name}</td>
                <td className="px-6 py-3">{emp.employeeId}</td>
                <td className="px-6 py-3">{emp.department}</td>
                <td className="px-6 py-3">
                  {emp.status ? (
                    // Already marked — show status badge
                    <span
                      className={`px-3 py-1 rounded text-white text-xs font-semibold ${
                        emp.status === "present"
                          ? "bg-green-500"
                          : emp.status === "absent"
                          ? "bg-red-500"
                          : emp.status === "sick"
                          ? "bg-gray-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {emp.status}
                    </span>
                  ) : (
                    // Not yet marked — show action buttons
                    <div className="flex space-x-2">
                      <button
                        onClick={() => markAttendance(emp._id, "present")}
                        className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => markAttendance(emp._id, "absent")}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => markAttendance(emp._id, "sick")}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                      >
                        Sick
                      </button>
                      <button
                        onClick={() => markAttendance(emp._id, "leave")}
                        className="px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                      >
                        Leave
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Attendance;