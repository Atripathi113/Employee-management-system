import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUsers, FaBuilding, FaMoneyBillWave, FaCogs } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";



const Sidebar = () => {
    const {user} = useAuth();
  return (
    
        <div className= "bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-6 p-4 w-64">
            <div className="bg-teal-600 h-12 flex items-center justify-center">
                <h2 className="text -2x1 text-center font-raleway">Employee Management</h2>
            </div>
            <div className="px-4">
                <NavLink to="/employee-dashboard" 
                className={({isActive}) => `${isActive ? "bg-teal-500" : " "}flex items-center
                 space-x-4 blocks py-2.5 px-4 rounded 
                hover:bg-gray-700 hover:text-white `
                 }>
                <FaTachometerAlt/>
                <span>Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 blocks py-2.5 px-4 rounded 
                hover:bg-gray-700 hover:text-white`
                 }>
                <FaUsers/>
                <span>My Profile</span>
                </NavLink>
                <NavLink to="/employee-dashboard/leaves"
                className={({isActive}) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 blocks py-2.5 px-4 rounded 
                hover:bg-gray-700 hover:text-white` 
                 }>
                <FaBuilding/>
                <span>Leaves</span>
                </NavLink>
              
                <NavLink to={`/employee-dashboard/salary/${user._id}`}
                className={({isActive}) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 blocks py-2.5 px-4 rounded 
                hover:bg-gray-700 hover:text-white `
                 }>
                <FaMoneyBillWave/>
                <span>Salary</span>
                </NavLink>
                <NavLink to="/employee-dashboard/settings"
                  className={({isActive}) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 blocks py-2.5 px-4 rounded 
                hover:bg-gray-700 hover:text-white` 
                }>
                <FaCogs/>
                <span>Settings</span>
                </NavLink>
            </div>
        </div>
    
  );
};

export default Sidebar;