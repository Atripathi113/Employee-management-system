 import { useNavigate } from "react-router-dom"; 
import axios from "axios";
   export const columns = [
    {
        name:"S.no",
        selector:(row) => row.serialNumber,
    },
    {
        name:"Department Name",
        selector:(row) => row.dept_name,
        sortable: true,
    },{
        name:"Action",
        selector:(row) => row.action,
    }
];
 export const DepartmentButtons=({Id, onDelete})=>{
    const navigate= useNavigate();

    const handleDelete= async (id)=>{
        const confirm=window.confirm("Are you sure you want to delete this department?");
        if(confirm){
         try{
            const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }); 
            if(response.data.success){
                onDelete(id);
                
            }
            // Handle the response data (to be implemented)
        } catch (error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.message);
            }
        }}
    return(
        <div className="flex space-x-3">
            <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" 
            onClick={() => navigate(`/admin-dashboard/department/${Id}`)}>Edit</button>
            <button className="bg-red-500 text-white px-2 py-1 rounded" 
            onClick={()=>handleDelete(Id)}>Delete</button>
        </div>
    )
}}
