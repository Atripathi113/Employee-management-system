import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaFileAlt,
} from "react-icons/fa";

const links = [
  { to: "/admin-dashboard",              icon: <FaTachometerAlt />, label: "Dashboard"         },
  { to: "/admin-dashboard/employees",    icon: <FaUsers />,         label: "Employees"         },
  { to: "/admin-dashboard/departments",  icon: <FaBuilding />,      label: "Departments"       },
  { to: "/admin-dashboard/leaves",       icon: <FaCalendarAlt />,   label: "Leaves"            },
  { to: "/admin-dashboard/salary/add",   icon: <FaMoneyBillWave />, label: "Salary"            },
  { to: "/admin-dashboard/attendance",   icon: <FaClipboardCheck />,label: "Attendance"        }, 
  { to: "/admin-dashboard/attendance-report",icon: <FaFileAlt />,   label: "Attendance Report" }, 
  { to: "/admin-dashboard/settings",     icon: <FaCogs />,          label: "Settings"          },
];

const navClass = ({ isActive }) =>
  `${isActive ? "bg-teal-500" : ""} flex items-center space-x-4 py-2.5 px-4 rounded
       hover:bg-gray-700 hover:text-white transition duration-200`;

const AdminSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 flex flex-col">

     
      <div className="bg-teal-600 h-12 flex items-center justify-center shrink-0">
        <h2 className="text-xl font-bold text-center">Employee MS</h2>
      </div>

    
      <nav className="flex flex-col space-y-1 px-4 py-6 overflow-y-auto">
        {links.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className={navClass} end={to === "/admin-dashboard"}>
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

    </div>
  );
};

export default AdminSidebar;