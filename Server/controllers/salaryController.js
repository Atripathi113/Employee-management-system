import Salary from '../models/Salary.js';

const addSalary = async (req, res) => {
    try{
        const { employeeId, basicSalary, allowances, deductions,  payDate } = req.body;
        const totalSalary= parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });
        await newSalary.save();

        res.status(201).json({ message: 'Salary added successfully', salary: newSalary });
    } catch (error) {
        
        res.status(500).json({ message: 'Error adding salary', error });

    }
}

const getSalary = async (req, res) => {
    try {
        const salary = await Salary.findOne({ employeeId: req.params.id }).populate('employeeId');
        if (!salary) {
            return res.status(404).json({ message: 'Salary not found' });
        }
       return res.status(200).json({ salary });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching salary', error });
    }
};


export { addSalary, getSalary };