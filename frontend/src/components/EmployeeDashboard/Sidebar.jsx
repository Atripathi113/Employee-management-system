import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaCogs,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  const links = [
    { to: "/employee-dashboard",                        icon: <FaTachometerAlt />, label: "Dashboard", end: true },
    { to: `/employee-dashboard/profile/${user._id}`,    icon: <FaUsers />,         label: "My Profile" },
    { to: `/employee-dashboard/leaves/${user._id}`,     icon: <FaBuilding />,      label: "Leaves"     },
    { to: `/employee-dashboard/salary/${user._id}`,     icon: <FaMoneyBillWave />, label: "Salary"     },
    { to: "/employee-dashboard/settings",               icon: <FaCogs />,          label: "Settings"   },
  ];

  const navClass = ({ isActive }) =>
    `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200`;

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 flex flex-col">
      
      <div className="bg-teal-600 h-12 flex items-center justify-center shrink-0">
        <h2 className="text-xl font-bold text-center">Employee MS</h2>
      </div>

      <nav className="flex flex-col space-y-1 px-4 py-6 overflow-y-auto">
        {links.map(({ to, icon, label, end }) => (
          <NavLink key={to} to={to} className={navClass} end={end}>
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  );
};

export default Sidebar;