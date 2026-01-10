import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Employee from "../../../../Server/models/Employee";
import { columns, EmployeeButtons } from "../utilities/EmployeeHelper.jsx";
import DataTable from "react-data-table-component";
const List = () => {
    const [employees, setEmployees] = useState([]);
    const [empLoading, setEmpLoading] = useState(true);
    //const [filteredEmployees, setFilteredEmployees] = useState([]);


     useEffect(() => { 
        const fetchEmployees = async () => {
            setEmpLoading(true);
        try{
            const response = await axios.get("http://localhost:5000/api/employee", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                let sno=1
                const empData =  await response.data.departments.map((emp) => (
                    { _id: emp._id,
                         serialNumber: sno++,
                          dept_name: emp.department.dept_name,
                          name: emp.userId.name,
                          dob: new Date(emp.dob).toDateString(),
                          profileImage: <image src={`http://localhost:5000/public/uploads/${emp.userId.profileImage}`} alt="Profile" className="w-10 h-10 rounded-full" />,
                            action: (<EmployeeButtons Id={emp._id} />),
                         }
                ))
                setEmployees(empData);
               // setFilteredEmployees(empData); 
            }
            // Handle the response data (to be implemented)
        } catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }finally{
            setEmpLoading(false);
        }
    }
        // Fetch employee data from server (to be implemented)
        fetchEmployees();
    }, []);
    return (
         <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="search dept" className="px-4 py-0.5" 
                 />
                <Link to="/admin-dashboard/add-employee" 
                className="px-4 py-1 bg-teal-600">Add Employee</Link>
            </div>
            <div>
                <DataTable columns={columns} data={employees} />
            </div>
            
        </div>
    )
}   
export default List;