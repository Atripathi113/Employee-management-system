import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const ViewSalary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  
  const {user} =useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
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
    fetchSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;

    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.employeeId
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    setFilteredSalaries(filteredRecords);
  };

  let sno = 1;

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : filteredSalaries.length === 0 ? (
        <div>No salary records found.</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Salary History</h2>

            <div className="flex justify-end my-3">
              <input
                type="text"
                placeholder="Search By Emp ID"
                className="border px-2 rounded-md py-0.5 border-gray-300"
                onChange={filterSalaries}
              />
            </div>

            {filteredSalaries.length > 0 ? (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                  <tr>
                    <th className="px-6 py-3">SNO</th>
                    <th className="px-6 py-3">Emp ID</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Allowance</th>
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary._id}
                      className="bg-white border-b"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {salary.employeeId.employeeId}
                      </td>
                      <td className="px-6 py-3">
                        {salary.basicSalary}
                      </td>
                      <td className="px-6 py-3">
                        {salary.allowances}
                      </td>
                      <td className="px-6 py-3">
                        {salary.deductions}
                      </td>
                      <td className="px-6 py-3">
                        {salary.netSalary}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No salary records found.</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewSalary;