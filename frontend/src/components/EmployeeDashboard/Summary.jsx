import React from "react";
import {FaUser} from "react-icons/fa";
import  {useAuth} from "../../context/AuthContext";

const Summary = () => {
    const {user} = useAuth();

    return(
        <div className="p-6">
    <div
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div
        className={`flex justify-center items-center text-3xl px-6 py-4 text-white bg-teal-600 
                    transition-all duration-300 hover:brightness-110`}
      >
        <FaUser/>
      </div>

      <div className="flex flex-col justify-center pl-4 py-2">
        <p className="text-gray-700 text-lg font-semibold">Welcome Back</p>
        <p className="text-2xl font-bold text-gray-900">{user.name}</p>
      </div>
    </div>
    </div>
  )
};

export default Summary;