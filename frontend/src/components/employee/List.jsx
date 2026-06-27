import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { columns, EmployeeButtons } from "../../utilities/EmployeeHelper";
import DataTable from "react-data-table-component";
import { API_URL } from "@utilities/Api";
import { DEFAULT_AVATAR } from "../../constants/Index.jsx";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(true);
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/employee`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

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
                // Fix: fallback to default avatar if no image
                src={
                  emp.userId?.profileImage
                    ? `${API_URL}/uploads/${emp.userId.profileImage}`
                    : DEFAULT_AVATAR
                }
                alt={emp.userId?.name || "Employee"}
                className="w-10 h-10 rounded-full object-cover"
                // Fix: second fallback if image URL breaks
                onError={(e) => { e.target.src = DEFAULT_AVATAR; }}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(empData);
           setAllEmployees(empData);
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
     

   const handleSearch = (e) => {
  const q = e.target.value.toLowerCase();
  setSearchQuery(q);
  if (!q) {
    setEmployees(allEmployees);
  } else {
    setEmployees(allEmployees.filter((emp) =>
      emp.dept_name?.toLowerCase().includes(q) ||
      emp.name?.toLowerCase().includes(q)
    ));
  }
};

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
      <DataTable columns={columns} data={employees} progressPending={empLoading} />
    </div>
  );
};

export default List;