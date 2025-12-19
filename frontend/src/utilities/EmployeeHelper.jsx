import axios from "axios";
import React from "react";



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
