import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-sm text-teal-600 hover:text-teal-800 font-medium mb-4 transition duration-200"
    >
      ← Back
    </button>
  );
};

export default BackButton;