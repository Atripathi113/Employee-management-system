import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchDepartments } from '../../utilities/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
   const navigate = useNavigate();
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
      const { name, value, files } = e.target;
      if (name === "profileImage") {
         setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
      } else {
         setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
         formDataObj.append(key, formData[key]);
      });

      try {
         const response = await axios.post("http://localhost:5000/api/employee/add", formDataObj, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
         })
         if (response.data.success) {
            navigate("/admin-dashboard/employees");
         }

      } catch (error) {
         if (error.response && !error.response.data.success) {
            alert(error.response.data.message);
         }
      }
   }

   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

            {/* Header */}
            <div className="bg-teal-600 px-8 py-5">
               <h2 className="text-xl font-bold text-white text-center">Add Employee</h2>
            </div>

            <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

               {/* Name */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Name</label>
                  <input
                     type="text"
                     name="name"
                     onChange={handleChange}
                     placeholder="Insert Name"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* Email */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Email</label>
                  <input
                     type="email"
                     name="email"
                     onChange={handleChange}
                     placeholder="Insert Email"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* Employee ID */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Employee ID</label>
                  <input
                     type="text"
                     name="employeeId"
                     onChange={handleChange}
                     placeholder="Employee ID"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* DOB */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Date of Birth</label>
                  <input
                     type="date"
                     name="dob"
                     onChange={handleChange}
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* Gender */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Gender</label>
                  <select
                     name="gender"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     onChange={handleChange}
                  >
                     <option value="">Select Gender</option>
                     <option value="Male">Male</option>
                     <option value="Female">Female</option>
                     <option value="Other">Other</option>
                  </select>
               </div>

               {/* Marital Status */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Marital Status</label>
                  <select
                     name="maritalStatus"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     onChange={handleChange}
                  >
                     <option value="">Select Status</option>
                     <option value="Single">Single</option>
                     <option value="Married">Married</option>
                  </select>
               </div>

               {/* Designation */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Designation</label>
                  <input
                     type="text"
                     name="designation"
                     onChange={handleChange}
                     placeholder="Designation"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                  />
               </div>

               {/* Department */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Department</label>
                  <select
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     name='department'
                     onChange={handleChange}
                     required
                  >
                     <option value="">Select Department</option>
                     {departments.map(dept => (
                        <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                     ))}
                  </select>
               </div>

               {/* Salary */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Salary</label>
                  <input
                     type="number"
                     name="salary"
                     onChange={handleChange}
                     placeholder="Salary"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* Password */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Password</label>
                  <input
                     type="password"
                     name="password"
                     onChange={handleChange}
                     placeholder="******"
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     required
                  />
               </div>

               {/* Role */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Role</label>
                  <select
                     className="w-full border border-gray-300 p-2.5 rounded-lg text-gray-700 focus:outline-none focus:border-teal-500"
                     name='role'
                     onChange={handleChange}
                     required
                  >
                     <option value="">Select Role</option>
                     <option value="Admin">Admin</option>
                     <option value="Employee">Employee</option>
                  </select>
               </div>

               {/* Image */}
               <div>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Upload Image</label>
                  <input
                     type="file"
                     name="profileImage"
                     onChange={handleChange}
                     accept='image/*'
                     className="w-full border border-gray-300 p-2 rounded-lg bg-white text-gray-700 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                  />
               </div>

               {/* Submit Button */}
               <div className="md:col-span-2">
                  <button
                     type="submit"
                     className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-lg transition duration-200"
                  >
                     Add Employee
                  </button>
               </div>

            </form>
         </div>
      </div>
   )
}

export default Add;