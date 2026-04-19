import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";


const Navbar = () => {
    const {user,logout}= useAuth();
  return (
    <div className="flex justify-between items-center h-12 p-4 bg-blue-600 text-white">
        <p>Welcome {user.name}</p>
        <button className="px-4 py-1 bg-teal-700 hover:bg-teal-800" onClick={logout}>
            Logout
        </button>
    </div>
  );
}
export default Navbar;
