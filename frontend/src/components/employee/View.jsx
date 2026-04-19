import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({});



 useEffect(() => { 
        const fetchEmployee = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                setEmployee(response.data.employee);
                
            }
            // Handle the response data (to be implemented)
        } catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }
    }
        // Fetch department data from server (to be implemented)
        fetchEmployee();
    }, []);
    return (
        <div className="max-w-3x1 mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
<h2 className="text-2x1 font-bold mb-8 text-center">
Employee Details
</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<img
src={ `http://localhost:5000/${employee.userId.profileImage}` }
className="rounded-full border w-72"
/>
</div>

 <div>
<div className="flex space-x-3 mb-5">
<p className="text-1g font-bold">Name :</p>
<p className="font-medium">{employee.userId.name}</p>
</div>
<p className="text-1g font-bold">Date of Birth :</p>
<p className="font-medium">
{new Date(employee.dob).toLocaleDateString()}
</p>
</div>

<div className="flex space-x-3 mb-5">
<p className="text-1g font-bold">Gender :</p>
<p className="font-medium">{employee.gender}</p>
</div>

<div className="flex space-x-3 mb-5">
<p className="text-1g font-bo}d">Department: </p>
<p className="font-medium">{employee.department.dep_name}</p>
</div>
<div className="flex space-x-3 mb-5">
<p className="text-1g font-bold">Marital Status :</p>
<p className="font-medium">{employee.maritalStatus}</p>
</div>
</div>
</div>

    )
}
 export default View;