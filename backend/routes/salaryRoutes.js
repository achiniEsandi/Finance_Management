import express from 'express';
import Salary from '../models/Salary.js';

const router = express.Router();

// Route to add a new salary entry
router.post('/add', async (req, res) => {
    try {
        const { employeeName, salaryAmount } = req.body;

        const newSalary = new Salary({ employeeName, salaryAmount });
        await newSalary.save();
        res.status(201).send('Salary Added');
    } catch (error) {
        res.status(500).send('Error adding salary: ' + error.message);
    }
});

// Route to get all salary entries
router.get('/', async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.json(salaries);
    } catch (error) {
        res.status(500).send('Error fetching salaries: ' + error.message);
    }
});

export default router;
