import React from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {columns} from "../../utilities/DepartmentCol";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

 const Department=  () => {
    const [departments, setDepartments] = useState(null)
    const [deptLoading, setDeptLoading] = useState(true);
    const [filteredDepartments, setFilteredDepartments] = useState([]);

    const onDelete = async(id) => {
        const data=departments.filter((dept) => dept._id !== id);
        setDepartments(data);
    }

    useEffect(() => { 
        const fetchDepartments = async () => {
            setDeptLoading(true);
        try{
            const response = await axios.get("http://localhost:5000/api/departments", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                let sno=1
                const deptData =  await response.data.departments.map((dept) => (
                    { _id: dept._id,
                         serialNumber: sno++,
                          dept_name: dept.dept_name,
                            action: (<DepartmentButtons Id={dept._id} onDelete={onDelete}/>),
                         }
                ))
                setDepartments(deptData);
                setFilteredDepartments(deptData); 
            }
            // Handle the response data (to be implemented)
        } catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }finally{
            setDeptLoading(false);
        }
    }
        // Fetch department data from server (to be implemented)
        fetchDepartments();
    }, []);

    const filterDepartments = (e) => {
        const records= departments.filter((dept) => 
            dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase()));
            setFilteredDepartments(records);
    }
        
    return(
        <> {deptLoading ? <div>Loading...</div> :
        

        <div className="p-5">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Department Management</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="search dept" className="px-4 py-0.5" 
                onChange={filterDepartments} />
                <Link to="/admin-dashboard/add-department" 
                className="px-4 py-1 bg-teal-600">Add Department</Link>
            </div>
            <div>
                <DataTable columns={columns} data={filteredDepartments} pagination/>
            </div>
        </div>
  } </>
        
    
    )
}
export default Department;