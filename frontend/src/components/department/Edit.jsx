import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
    const { id } = useParams();

    const [department, setDepartment] = useState({   
        dept_name: "",
        dept_desc: ""
    });

    const [deptLoading, setDeptLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            setDeptLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/departments/${id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (response.data.success) {
                    setDepartment(response.data.department);
                }

            } catch (error) {
                console.error(error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.message);
                }
            } finally {
                setDeptLoading(false);
            }
        };

        fetchDepartments();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:5000/api/departments/${id}`, 
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
            console.error(error);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.message);
            }
        }
    };

    return (
        <>
            {deptLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
                        <h3 className="text-2xl font-bold mb-6">
                            Edit Department
                        </h3>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className="text-sm font-medium text-gray-700">
                                    Department Name:
                                </label>

                                <input
                                    type="text"
                                    name="dept_name"                 // ✅ FIX
                                    value={department.dept_name}
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
                                    name="dept_desc"                 // ✅ FIX
                                    value={department.dept_desc}
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
                                    Edit Department
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Edit;