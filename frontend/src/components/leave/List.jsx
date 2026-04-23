import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect,  } from "react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";


const List = () => {
  const {user} = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  let sno = 1;



   const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/leave/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setLeaves (response.data.leaves);
        setFilteredLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
      fetchLeaves();
    }, []);

  return (
    <div className='p-6'>
     <div className="text-center">
<h3 className="text-2x1 font-bold">Manage Leaves</h3>
</div>
<div className="flex justify-between items-center">
<input
type="text"
placeholder="Search By Leave Type"
className="px-4 py-0.5 border"
/>
<Link
to="/employee-dashboard/add-leave"
className="px-4 py-1 bg-teal-600 rounded text-white"
>
Add New Leave
</Link>
</div>
      
      <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                  <tr>
                    <th className="px-6 py-3">SNO</th>
                    <th className="px-6 py-3">LEAVE TYPE</th>
                    <th className="px-6 py-3">FROM</th>
                    <th className="px-6 py-3">TO</th>
                    <th className="px-6 py-3">DESCRIPTION</th>
                    <th className="px-6 py-3">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => (
                    <tr
                      key={leave._id}
                      className="bg-white border-b"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">
                        {leave.leaveType}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-3">
                        {leave.description}
                      </td>
                      <td className="px-6 py-3">
                        {leave.status}  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
    </div>
  )
};

export default List;