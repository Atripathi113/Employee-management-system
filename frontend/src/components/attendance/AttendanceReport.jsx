import React, { useEffect, useState } from "react";
import axios from "axios";

const AttendanceReport = () => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [report, setReport] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchReport = async (newSkip = 0, reset = true) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?date=${date}&limit=${limit}&skip=${newSkip}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setReport((prev) =>
          reset ? response.data.report : [...prev, ...response.data.report]
        );
        setTotal(response.data.total);
        setSkip(newSkip + limit);
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
    fetchReport(0, true);
  }, [date]);

  const handleLoadMore = () => {
    fetchReport(skip, false);
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Attendance Report</h2>
      </div>

      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setSkip(0);
            setDate(e.target.value);
          }}
          className="border border-gray-300 p-1 rounded"
        />
      </div>

      <p className="font-semibold mb-3">Date: {date}</p>

      {loading && report.length === 0 ? (
        <div className="text-center py-10">Loading...</div>
      ) : report.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No attendance records found for this date.
        </div>
      ) : (
        <>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
              <tr>
                <th className="px-6 py-3">Serial No</th>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Employee Name</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {report.map((rec, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{rec.sno}</td>
                  <td className="px-6 py-3">{rec.employeeId}</td>
                  <td className="px-6 py-3">{rec.name}</td>
                  <td className="px-6 py-3">{rec.department}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`font-medium ${
                        rec.status === "present"
                          ? "text-green-600"
                          : rec.status === "absent"
                          ? "text-red-600"
                          : rec.status === "sick"
                          ? "text-gray-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {report.length < total && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="mt-4 px-6 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AttendanceReport;