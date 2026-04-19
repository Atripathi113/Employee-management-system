import React from "react";
const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Employee Dashboard</h1>
      </div>
      <nav className="p-4">
        <ul>
          <li className="mb-2">
            <a href="#" className="hover:bg-gray-600 p-2 block">Home</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:bg-gray-600 p-2 block">Profile</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:bg-gray-600 p-2 block">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;