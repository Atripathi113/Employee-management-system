import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { fetchDepartments } from '../../utilities/EmployeeHelper.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
   const navigate=  useNavigate();
   const { id } = useParams();

   const [employee, setEmployee] = useState({
      name: "",
      maritalStatus: "",
      designation: "",
      department: "",
      salary: "",
   });

   const [departments, setDepartments] = useState([]);

   useEffect(() => {
      const getDepartments = async () => {
         const departments = await fetchDepartments();
         setDepartments(departments);
      }
      getDepartments();
   }, []);

   useEffect(() => { 
      const fetchEmployee = async () => {
         try{
            const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
               }
            }); 

            if(response.data.success){
               const employeeData = response.data.employee;

               setEmployee((prevData) => ({
                  ...prevData,
                  name: employeeData.userId.name,
                  maritalStatus: employeeData.maritalStatus,
                  designation: employeeData.designation,
                  department: employeeData.department._id,
                  salary: employeeData.salary,
               }));
            }

         } catch (error){
            if(error.response && !error.response.data.success){
               alert(error.response.data.message);
            }
         }
      }

      fetchEmployee();
   }, [id]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevData) => ({...prevData, [name]: value}));
   }

   const handleSubmit= async (e) => {
      e.preventDefault();

      try {
         const response = await axios.put(`http://localhost:5000/api/employee/${id}`, employee, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
         });

         if(response.data.success){
            navigate("/admin-dashboard/employees");
         }

      } catch (error) {
         if(error.response && !error.response.data.success){
            alert (error.response.data.message);
         }
      }
   }

   return (
      <div className="w-full bg-white p-6 rounded-lg shadow">

         <h2 className="text-2xl font-semibold mb-6 text-center">Edit Employee</h2>

         <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

            <div>
               <label className="block text-sm font-medium mb-1"> Edit Name</label>
               <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
               />
            </div>

            <div>
               <label className="block text-sm font-medium mb-1">Marital Status</label>
               <select
                  className="w-full border border-gray-300 p-2 rounded"
                  name='maritalStatus'
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  required
               >
                  <option value="">Select Status</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
               </select>
            </div>

            <div>
               <label className="block text-sm font-medium mb-1">Designation</label>
               <input
                  type="text"
                  placeholder="Designation"
                  className="w-full border border-gray-300 p-2 rounded"
                  name="designation"
                  onChange={handleChange}
                  value={employee.designation}
                  required
               />
            </div>

            <div>
               <label className="block text-sm font-medium mb-1">Department</label>
               <select
                  className="w-full border border-gray-300 p-2 rounded"
                  name='department'
                  onChange={handleChange}
                  value={employee.department}
                  required
               >
                  <option value="">Select Department</option>
                  {departments.map(dept =>(
                     <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                  ))}
               </select>
            </div>

            <div>
               <label className="block text-sm font-medium mb-1">Salary</label>
               <input
                  type="number"
                  name="salary"
                  onChange={handleChange}
                  value={employee.salary}
                  placeholder="Salary"
                  className="w-full border border-gray-300 p-2 rounded"
                  required
               />
            </div>

            <div className="md:col-span-2">
               <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition">
                  Edit Employee
               </button>
            </div>

         </form>
      </div>
   )
}

export default Edit;