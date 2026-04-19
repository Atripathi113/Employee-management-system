import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchDepartments, getEmployees } from "../../utilities/EmployeeHelper";

const Add = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [salary, setSalary] = useState({
    EmployeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      const deps = await fetchDepartments();
      setDepartments(deps);
    };
    getDepartments();
  }, []);

  // Handle department change
  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add/${id}`,
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      {departments.length > 0 ? (
        <div className="w-full bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Add Salary
          </h2>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            {/* Department */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                className="w-full border p-2 rounded"
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
              <label className="block text-sm font-medium mb-1">
                Employee
              </label>
              <select
                name="EmployeeId"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.userId.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                value={salary.basicSalary}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={salary.allowances}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={salary.deductions}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={salary.payDate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Submit */}
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-lg"
              >
                Add Salary
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full bg-white p-6 rounded-lg shadow text-center">
          Loading...
        </div>
      )}
    </>
  );
};

export default Add;