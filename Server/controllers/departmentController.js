

const addDepartment = async (req, res) => {
    try { const { dept_name, dept_desc } = req.body;
    const

    }catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
export { addDepartment };