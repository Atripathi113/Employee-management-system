import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden 
                 transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div
        className={`flex justify-center items-center text-3xl px-6 py-4 text-white ${color} 
                    transition-all duration-300 hover:brightness-110`}
      >
        {icon}
      </div>

      <div className="flex flex-col justify-center pl-4 py-2">
        <p className="text-gray-700 text-lg font-semibold">{text}</p>
        <p className="text-2xl font-bold text-gray-900">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
