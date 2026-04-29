import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 
const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept_name: "",
        dept_desc: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/departments/add",
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }

        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                <h3 className="text-2xl font-bold mb-6">Add Department</h3>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Department Name:
                        </label>

                        <input
                            type="text"
                            name="dept_name"
                            value={department.dept_name}   // ✅ FIX
                            onChange={handleChange}
                            placeholder="Enter Dept name"
                            className="mt-1 w-full p-2 border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Department Description:
                        </label>

                        <textarea
                            name="dept_desc"
                            value={department.dept_desc}   // ✅ FIX
                            onChange={handleChange}
                            placeholder="Enter Dept Description"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        ></textarea>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
                        >
                            Add Department
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;