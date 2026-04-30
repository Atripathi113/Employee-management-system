import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utilities/EmployeeHelper";
import DataTable from "react-data-table-component";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;

          const empData = response.data.employees.map((emp) => ({
            _id: emp._id,
            serialNumber: sno++,
            dept_name: emp.department?.dept_name,
            name: emp.userId?.name,
            dob: new Date(emp.dob).toLocaleDateString("en-GB"),
            profileImage: (
              <img
                src={`http://localhost:5000/uploads/${emp.userId?.profileImage}`}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));

          setEmployees(empData);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-5">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex justify-between items-center my-3">
        <input
          type="text"
          placeholder="Search dept"
          className="px-4 py-1 border"
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 text-white rounded"
        >
          Add Employee
        </Link>
      </div>

      <DataTable
        columns={columns}
        data={employees}
        progressPending={empLoading}
      />
    </div>
  );
};

export default List;