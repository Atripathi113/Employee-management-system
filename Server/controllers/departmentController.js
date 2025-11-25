import Department from '../models/Department.js';
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}
const addDepartment = async (req, res) => {
    try { const { dept_name, dept_desc } = req.body;
    const newdept= new Department({ dept_name, dept_desc });
    await newdept.save();
     return res.status(201).json({ success: true, message: "Department added successfully", department: newdept });

    }catch (error) {
       return  res.status(500).json({ success: false, message: "Server Error" });
    }
}
const getDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
       
            return res.status(200).json({ success: true, department });
        } catch (error) {
        return res.status(500).json({ success: false, message: "Server Error" });
        }}

        const updateDepartment = async (req, res) => {
            try {
                const { id } = req.params;
                const { dept_name, dept_desc } = req.body;
                const update = await Department.findByIdAndUpdate(
                    {_id: id},{
                        dept_name,
                        dept_desc },
                    
                )
                return res.status(200).json({ success: true,
                     message: "Department updated successfully", update });
            }catch (error) {
                return res.status(500).json({ success: false, message: "Server Error" });
            }

        }
        const deleteDepartment = async (req, res) => {
            try {
                const { id } = req.params;
                await Department.findByIdAndDelete(id);
                return res.status(200).json({ success: true, message: "Department deleted successfully" });
            } catch (error) {
                return res.status(500).json({ success: false, message: "Server Error" });
            }
        }
export { addDepartment, getDepartments, getDepartment, updateDepartment , deleteDepartment };