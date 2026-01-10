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
        <div>
            <h1>Employee View</h1>
        </div>
    )
}
 export default View;