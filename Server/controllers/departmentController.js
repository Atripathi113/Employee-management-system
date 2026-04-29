import Department from '../models/Department.js';

// Get all departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({
            success: true,
            departments
        });
    } catch (error) {
        console.error("Get Departments Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Add department
const addDepartment = async (req, res) => {
    try {
        const { dept_name, dept_desc } = req.body;

        const newdept = new Department({
            dept_name,
            dept_desc
        });

        await newdept.save();

        return res.status(201).json({
            success: true,
            message: "Department added successfully",
            department: newdept
        });

    } catch (error) {
        console.error("Add Department Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Get single department
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const department = await Department.findById(id);

        return res.status(200).json({
            success: true,
            department
        });

    } catch (error) {
        console.error("Get Department Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update department
const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { dept_name, dept_desc } = req.body;

        const update = await Department.findByIdAndUpdate(
            { _id: id },
            {
                dept_name,
                dept_desc
            }
        );

        return res.status(200).json({
            success: true,
            message: "Department updated successfully",
            update
        });

    } catch (error) {
        console.error("Update Department Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Delete department
const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedept=await Department.findById({ _id: id });
        await deletedept.deleteOne();

        return res.status(200).json({
            success: true,
            department: deletedept,
            message: "Department deleted successfully"
        });

    } catch (error) {
        console.error("Delete Department Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

export {
    addDepartment,
    getDepartments,
    getDepartment,
    updateDepartment,
    deleteDepartment
};