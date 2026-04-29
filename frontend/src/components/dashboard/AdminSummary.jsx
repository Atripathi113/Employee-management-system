import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminSummary = () => {
    const [summary , setSummary] = useState(null)

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const summary = await  axios.get("http://localhost:5000/api/dashboard/summary", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSummary(summary.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSummary();
    }, [])

    if(!summary){
        return <div>Loading...</div>
    }



  return (
    <div className="p-6">
      <h3 className="text-2x1 font-bold">Dasboard overview</h3>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text={"Total Employees"}
          number={10}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Total Departments"}
          number={6}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text={"Total "}
          number="$896"
          color="bg-red-600"
        />
      </div>
      <div className="mt-12">
        <h4 className="text-center text-2x1 font-bold">Leave Details</h4>
        <div className="grid grid-cols md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text={"Leave Applied"}
            number={10}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text={"Leave Approved"}
            number={10}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text={"Leave Pending"}
            number={10}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text={"Leave Rejected"}
            number={10}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};
export default AdminSummary;
