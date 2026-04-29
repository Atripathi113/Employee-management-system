import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S.no",
    selector: (row) => row.sno,
    width: "60px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "130px",
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    cell: (row) => (
      <img
        src={`http://localhost:5000/${row.profileImage}`}
        alt="profile"
        className="w-10 h-10 rounded-full"
      />
    ),
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.dept_name,
    sortable: true,
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const getEmployees = async (id) => {
  let employees = [];

  try {
    const response = await axios.get(
      `http://localhost:5000/api/employee/department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      employees = response.data.employees.map((emp, index) => ({
        sno: index + 1,
        _id: emp._id,
        name: emp?.userId?.name,
        profileImage: emp?.userId?.profileImage, // ✅ added
        dept_name: emp?.department?.dept_name,
        dob: emp?.dob,
      }));
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.message);
    }
  }

  return employees;
};

export const fetchDepartments = async () => {
  let departments = [];

  try {
    const response = await axios.get(
      "http://localhost:5000/api/departments",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.message);
    }
  }

  return departments;
};

export const EmployeeButtons = ({ Id }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3">
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>

      <button
        className="bg-blue-500 text-white px-3 py-1"
        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
      >
        Edit
      </button>

      <button
        className="px-3 py-1 bg-green-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
      >
        Salary
      </button>

      <button
        className="px-3 py-1 bg-red-600 text-white"
        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  );
};