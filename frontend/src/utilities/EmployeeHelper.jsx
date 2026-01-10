import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name:"S.no",
        selector:(row) => row.sno,
        with: '60px',
    },
    {
        name:"Name",
        selector:(row) => row.name,
        sortable: true,
        width:'130px'
    }, {
        name:"Image",
        selector:(row) => row.profileImage,
        width:'100px'
    }, {
        name:"Department",
        selector:(row) => row.dept_name,
        sortable: true,
    },  {
        name:"DOB",
        selector:(row) => row.dob,
        sortable: true,
    }{
        name:"Action",
        selector:(row) => row.action,
    }
];




 export const fetchDepartments = async () => {

    let departments = [];
   
            
        try{
            const response = await axios.get("http://localhost:5000/api/departments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                departments = response.data.departments;
               
               
            }
            // Handle the response data (to be implemented)
        } catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }
         return departments;
    }

    export const EmployeeButtons=({Id, })=>{
    const navigate= useNavigate();

    
    return(
        <div className="flex space-x-3">
            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" 
            onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}>
                view</button>
                <button className="bg-blue-500 text-white px-3 py-1 ">Edit</button>
                <button className="px-3 py-1 bg-green-600 text-white">Salary</button>
                <button className="px-3 py-1 bg-red-600 text-white">Leave</button>
            
        </div>
    )
}
