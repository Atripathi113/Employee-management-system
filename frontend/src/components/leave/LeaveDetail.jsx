import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeaveDetail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.message);
        }
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.message);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Employee Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img
                src={`http://localhost:5000/${leave?.employeeId?.userId?.profileImage}`}
                className="rounded-full border w-72"
                alt="profile"
              />
            </div>

            <div>
              <div className="flex space-x-3 mb-5">
                <p className="text-lg font-bold">Name :</p>
                <p className="font-medium">
                  {leave?.employeeId?.userId?.name}
                </p>
              </div>

              <p className="text-lg font-bold">Leave Type:</p>
              <p className="font-medium">
                {leave.leaveType === "sick"
                  ? "Sick Leave"
                  : leave.leaveType === "casual"
                  ? "Casual Leave"
                  : "Earned Leave"}
              </p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Reason :</p>
              <p className="font-medium">{leave.reason}</p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Department: </p>
              <p className="font-medium">
                {leave?.employeeId?.department?.dep_name}
              </p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">Start Date :</p>
              <p className="font-medium">
                {new Date(leave.startDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">End Date :</p>
              <p className="font-medium">
                {new Date(leave.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="flex space-x-3 mb-5">
              <p className="text-lg font-bold">
                {leave.status === "pending" ? "Action:" : "Status:"}
              </p>

              {leave.status === "pending" ? (
                <div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => changeStatus(leave._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => changeStatus(leave._id, "Rejected")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <p className="font-medium">{leave.status}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">Loading...</p>
      )}
    </>
  );
};

export default LeaveDetail;