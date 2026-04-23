import Salary from '../models/Salary.js';
import Employee from '../models/Employee.js';

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
        const { id } = req.params;
        const salary = await Salary.find({ employeeId: id }).populate('employeeId');
        if (!salary || salary.length < 1) {
            const employee = await Employee.findById({userId:id});
            let salary = await Salary.find({ employeeId: employee._id }).populate('employeeId');
            
        }
       return res.status(200).json({ Success: true, salary });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching salary', error });
    }
};


export { addSalary, getSalary };