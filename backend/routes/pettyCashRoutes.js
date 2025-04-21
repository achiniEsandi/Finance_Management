import express from 'express';
import PettyCash from '../models/PettyCash.js';

const router = express.Router();

// Add a new petty cash expense
router.post('/add', async (req, res) => {
  try {
    const { description, amount } = req.body;
    const newPettyCashEntry = new PettyCash({ description, amount });
    await newPettyCashEntry.save();
    res.status(201).send('Petty Cash Entry Added');
  } catch (error) {
    res.status(500).send('Error adding petty cash entry: ' + error.message);
  }
});

// Get all petty cash expenses
router.get('/', async (req, res) => {
  try {
    const pettyCashEntries = await PettyCash.find().sort({ transactionDate: -1 });
    res.json(pettyCashEntries);
  } catch (error) {
    res.status(500).send('Error fetching petty cash entries: ' + error.message);
  }
});

// Optional: Get summary of expenses
router.get('/summary', async (req, res) => {
  try {
    const entries = await PettyCash.find();
    const totalExpense = entries.reduce((sum, entry) => sum + entry.amount, 0);
    res.json({ totalExpense });
  } catch (error) {
    res.status(500).send('Error calculating summary: ' + error.message);
  }
});

export default router;
