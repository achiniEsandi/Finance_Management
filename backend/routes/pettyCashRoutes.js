import express from 'express';
import PettyCash from '../models/PettyCash.js';

const router = express.Router();

// Route to add a new petty cash entry
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

// Route to get all petty cash entries
router.get('/', async (req, res) => {
    try {
        const pettyCashEntries = await PettyCash.find();
        res.json(pettyCashEntries);
    } catch (error) {
        res.status(500).send('Error fetching petty cash entries: ' + error.message);
    }
});

export default router;
