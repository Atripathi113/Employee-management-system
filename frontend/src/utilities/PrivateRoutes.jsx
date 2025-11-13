import React from "react";
import { useAuth } from "../context/authContext.jsx";
import { Navigate } from "react-router-dom";
  const PrivateRoutes =({childern}) =>{
    const {user,loading} = useAuth()
    if(loading){
        return <div>Loading...</div>;
    }
    return user ? childern : <Navigate to ="/login"/>;
  }
    export default PrivateRoutes;