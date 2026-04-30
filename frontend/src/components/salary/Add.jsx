import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utilities/EmployeeHelper";

const Add = () => {
  const navigate = useNavigate();

  const [salary, setSalary] = useState({
    employeeId: "",   // Fix 1: lowercase to match backend
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fix 2: removed /${id} — no param needed on add route
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Fix 3: backend returns { message } not { success } — check message
      if (response.status === 201) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {departments.length > 0 ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

          {/* Header */}
          <div className="bg-teal-600 px-8 py-5">
            <h2 className="text-xl font-bold text-white text-center">Add Salary</h2>
          </div>

          <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

            {/* Department */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                onChange={handleDepartment}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee */}
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Employee
              </label>
              <select
                name="employeeId"
                className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                onChange={handleChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                value={salary.basicSalary}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={salary.allowances}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={salary.deductions}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={salary.payDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            {/* Submit */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200"
              >
                Add Salary
              </button>
            </div>

          </form>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md text-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Add;