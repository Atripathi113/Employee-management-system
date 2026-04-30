import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Field = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="text-gray-800 font-medium">{value || "—"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-4 pb-2 border-b border-gray-100">
      {title}
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {children}
    </div>
  </div>
);

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
    };
    if (id) fetchEmployee();
  }, [id]);

  if (!id) return <div className="p-6 text-gray-500">Invalid employee ID</div>;
  if (!employee) return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">

        {/* Header Banner */}
        <div className="bg-teal-600 px-8 py-5">
          <h2 className="text-xl font-bold text-white text-center tracking-wide">
            Employee Profile
          </h2>
        </div>

        {/* Profile Hero */}
        <div className="flex flex-col sm:flex-row items-center gap-6 px-8 py-6 bg-gray-50 border-b border-gray-100">
          <img
            src={`http://localhost:5000/uploads/${employee.userId.profileImage}`}
            className="w-28 h-28 rounded-full object-cover border-4 border-teal-100 shadow-md"
            alt={employee.userId.name}
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{employee.userId.name}</h3>
            <p className="text-teal-600 font-medium mt-1">{employee.designation || "—"}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full border border-teal-200">
                {employee.userId.role}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                ID: {employee.employeeId}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-8 py-6">

          {/* Personal Information */}
          <Section title="Personal Information">
            <Field label="Full Name"      value={employee.userId.name} />
            <Field label="Email"          value={employee.userId.email} />
            <Field label="Date of Birth"  value={new Date(employee.dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} />
            <Field label="Gender"         value={employee.gender} />
            <Field label="Marital Status" value={employee.maritalStatus} />
          </Section>

          {/* Employment Information */}
          <Section title="Employment Information">
            <Field label="Employee ID"   value={employee.employeeId} />
            <Field label="Designation"   value={employee.designation} />
            <Field label="Department"    value={employee.department?.dept_name} />
            <Field label="Salary"        value={employee.salary ? `₹${Number(employee.salary).toLocaleString()}` : "—"} />
          </Section>

          {/* Account Information */}
          <Section title="Account Information">
            <Field label="Username"  value={employee.userId.username} />
            <Field label="Role"      value={employee.userId.role} />
          </Section>

        </div>
      </div>
    </div>
  );
};

export default View;