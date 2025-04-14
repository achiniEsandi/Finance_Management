import express from 'express';
import BankBook from '../models/BankBook.js';

const router = express.Router();

// Route to add a new bank book entry
router.post('/add', async (req, res) => {
    try {
        const { description, depositAmount, withdrawalAmount, balance } = req.body;
        
        const newBankBookEntry = new BankBook({ description, depositAmount, withdrawalAmount, balance });
        await newBankBookEntry.save();
        res.status(201).send('Bank Book Entry Added');
    } catch (error) {
        res.status(500).send('Error adding bank book entry: ' + error.message);
    }
});

// Route to get all bank book entries
router.get('/', async (req, res) => {
    try {
        const bankBooks = await BankBook.find();
        res.json(bankBooks);
    } catch (error) {
        res.status(500).send('Error fetching bank book entries: ' + error.message);
    }
});

export default router;
