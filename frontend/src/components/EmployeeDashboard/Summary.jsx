import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex items-center bg-gray-800 rounded-xl overflow-hidden w-fit shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer">
        
        <div className="flex justify-center items-center text-3xl px-6 py-5 text-white bg-teal-600">
          <FaUser />
        </div>

        <div className="flex flex-col justify-center pl-5 pr-6 py-3">
          <p className="text-gray-400 text-sm">Welcome Back</p>
          <p className="text-xl font-medium text-white">{user.name}</p>
        </div>

      </div>
    </div>
  );
};

export default Summary;