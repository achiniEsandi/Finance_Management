import express from 'express';
import PettyCash from '../models/PettyCash.js';

const router = express.Router();

// Route to add a new petty cash entry
router.post('/add', async (req, res) => {
  try {
    const { description, amount, transactionDate } = req.body;

    // Basic validation
    if (!description || !amount || !transactionDate) {
      return res.status(400).send("All fields are required.");
    }

    const amountNum = parseFloat(amount);
    if (amountNum <= 0 || amountNum > 5000) {
      return res.status(400).send("Amount must be greater than 0 and ≤ 5000.");
    }

    const date = new Date(transactionDate);
    const today = new Date();
    if (date > today) {
      return res.status(400).send("Future dates are not allowed.");
    }

    const newEntry = new PettyCash({
      description,
      amount: amountNum,
      transactionDate: date,
    });

    await newEntry.save();
    res.status(201).send('Petty Cash Entry Added');
  } catch (error) {
    res.status(500).send('Error adding petty cash entry: ' + error.message);
  }
});

// Route to get all entries
router.get('/', async (req, res) => {
  try {
    const entries = await PettyCash.find().sort({ transactionDate: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).send('Error fetching entries: ' + error.message);
  }
});

export default router;
