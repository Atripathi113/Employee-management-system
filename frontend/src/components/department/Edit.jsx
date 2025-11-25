import React ,{useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Edit = () => {
    const {id} = useParams();
    const [department, setDepartment] = useState([]);
    const [deptLoading, setDeptLoading] = useState(true);
    const navigate= useNavigate();

    useEffect(() => { 
        const fetchDepartments = async () => {
            setDeptLoading(true);
        try{
            const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                setDepartment(response.data.department);
                
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({...department, [name]: value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
         try {
                const response = await axios.put( `http://localhost:5000/api/department/${id}`, department, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                })
                if(response.data.success){
                    navigate("/admin-dashboard/departments");
                }

            }catch (error) {
                if(error.response && !error.response.data.success){
                    alert (error.response.data.message);
            }
        
        }
    }

   return(
    <> {deptLoading ? <div>Loading...</div> :
        <div >
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-2xl font-bold mb-6">Edit Department</h3>
                <form  onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="dept-name" 
                        className="text-sm font-medium text-gray-700">Department Name:</label>
                        <input type="text"
                        onChange={handleChange} 
                        value={department.dept_name}
                        placeholder="Enter Dept name" 
                         className="mt-1 w-full p-2 border-gray-300 rounded-md" required/>
                    </div>
                    <div>
                        <label htmlFor="dept-desc" 
                        className="block text-sm font-medium text-gray-700">Department Description:</label>
                        <textarea  name="description" 
                        onChange={handleChange}
                        value={department.dept_desc}
                        placeholder="Enter Dept Description"
                         className="mt-1 p-2 w-full border border gray-300 rounded-md"></textarea>
                    </div>
                    <div>
                        <button type="submit" 
                        className="px-4 py-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md">
                            Edit Department</button> 
                    </div>
                </form>
            </div>
        </div>
        }</>
    )
} 
export default Edit;