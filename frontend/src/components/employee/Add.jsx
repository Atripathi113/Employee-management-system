import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchDepartments } from '../../utilities/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
   const navigate=  useNavigate();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getDepartments = async () => {
        const departments = await fetchDepartments();
        setDepartments(departments);
        }
        getDepartments();
    }, []);

        const handleChange = (e) => {
            const { name, value ,files } = e.target;
            if(name === "image"){
                setFormData((prevData) => ({...prevData, [name]: files[0]}));
            } else {
                setFormData((prevData) => ({...prevData, [name]: value}));
            }
        }
         const handleSubmit= async (e) => {
            e.preventDefault();

            const formDataObj = new FormData();
            Objects.keys(formData).forEach((key) => {
                formDataObj.append (key, formData[key]);
            });
        try {
                const response = await axios.post("http://localhost:5000/api/employee/add", formDataObj, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if(response.data.success){
                    navigate("/admin-dashboard/employees");
                }

            }catch (error) {
                if(error.response && !error.response.data.success){
                    alert (error.response.data.message);
            }
        
        }}


    return (
        <div className="w-full bg-white p-6 rounded-lg shadow">

      <h2 className="text-2xl font-semibold mb-6 text-center">Add Employee</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Insert Name"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Insert Email"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-sm font-medium mb-1">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            onChange={handleChange}
            placeholder="Employee ID"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select className="w-full border border-gray-300 p-2 rounded"
          onChange={handleChange}>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* Marital Status */}
        <div>
          <label className="block text-sm font-medium mb-1">Marital Status</label>
          <select className="w-full border border-gray-300 p-2 rounded">
            <option>Select Status</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>

        {/* Designation */}
        <div>
          <label className="block text-sm font-medium mb-1">Designation</label>
          <input
            type="text"
            placeholder="Designation"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select className="w-full border border-gray-300 p-2 rounded"
          name='department'
          onChange={handleChange}
           required >

            <option value="">Select Department</option>
            {departments.map(dept =>(
                <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium mb-1">Salary</label>
          <input
            type="number"
            name="salary"
            onChange={handleChange}
            placeholder="Salary"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="******"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select className="w-full border border-gray-300 p-2 rounded"
          name='role'
          onChange={handleChange}
          required>
            <option>Select Role</option>
            <option>Admin</option>
            <option>Employee</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            placeholder='Upload Image'
            accept='image/*'
            className="w-full border border-gray-300 p-2 rounded bg-white"
          />
        </div>

      </form>

      {/* Submit Button */}
      <div className="mt-6">
        <button className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition">
          Add Employee
        </button>
      </div>

    </div>
    )
}
export default Add;