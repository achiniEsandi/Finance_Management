import express from 'express';
import ProfitLoss from '../models/ProfitLoss.js';

const router = express.Router();

// ─── Create a new P&L entry ───────────────────────────────────────────────────
router.post('/add', async (req, res) => {
  try {
    const { date, description, revenue, cogs, expenses, other } = req.body;
    if (!date) return res.status(400).send('Date is required.');
    const entry = new ProfitLoss({
      date: new Date(date),
      description: description || '',
      revenue, cogs, expenses, other
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).send('Error creating entry: ' + err.message);
  }
});

// ─── Get all entries (newest first) ──────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const entries = await ProfitLoss.find().sort({ date: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).send('Error fetching entries: ' + err.message);
  }
});

// ─── Update an entry ─────────────────────────────────────────────────────────
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await ProfitLoss.findByIdAndUpdate(
      req.params.id,
      { ...req.body, date: new Date(req.body.date) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).send('Error updating entry: ' + err.message);
  }
});

// ─── Delete an entry ─────────────────────────────────────────────────────────
router.delete('/delete/:id', async (req, res) => {
  try {
    await ProfitLoss.findByIdAndDelete(req.params.id);
    res.send('Entry deleted');
  } catch (err) {
    res.status(500).send('Error deleting entry: ' + err.message);
  }
});

// ─── Monthly summary ─────────────────────────────────────────────────────────
// Returns sums of each category + computed metrics:
//   totalRevenue, totalCOGS, grossProfit,
//   totalOperatingExpenses, operatingProfit,
//   netOther, netProfit
router.get('/monthly', async (req, res) => {
  try {
    const month = parseInt(req.query.month, 10);
    const year  = parseInt(req.query.year, 10);
    if (!month || !year) return res.status(400).send('month and year required');

    const start = new Date(year, month - 1, 1);
    const end   = new Date(year, month, 1);

    const [agg] = await ProfitLoss.aggregate([
      { $match: { date: { $gte: start, $lt: end } } },
      { $group: {
          _id: null,
          serviceIncome:    { $sum: '$revenue.serviceIncome' },
          sparePartsSales:  { $sum: '$revenue.sparePartsSales' },
          otherIncome:      { $sum: '$revenue.otherIncome' },
          partsCost:        { $sum: '$cogs.partsCost' },
          materialsCost:    { $sum: '$cogs.materialsCost' },
          salaries:         { $sum: '$expenses.salaries' },
          rent:             { $sum: '$expenses.rent' },
          utilities:        { $sum: '$expenses.utilities' },
          maintenance:      { $sum: '$expenses.maintenance' },
          marketing:        { $sum: '$expenses.marketing' },
          depreciation:     { $sum: '$expenses.depreciation' },
          interestIncome:   { $sum: '$other.interestIncome' },
          interestExpense:  { $sum: '$other.interestExpense' },
          misc:             { $sum: '$other.misc' }
      }}
    ]);

    const data = agg || {};
    const totalRevenue = (data.serviceIncome||0) + (data.sparePartsSales||0) + (data.otherIncome||0);
    const totalCOGS    = (data.partsCost||0)     + (data.materialsCost||0);
    const grossProfit  = totalRevenue - totalCOGS;
    const totalOpEx    = (data.salaries||0) + (data.rent||0) + (data.utilities||0)
                       + (data.maintenance||0) + (data.marketing||0) + (data.depreciation||0);
    const operatingProfit = grossProfit - totalOpEx;
    const netOther     = (data.interestIncome||0) - (data.interestExpense||0) + (data.misc||0);
    const netProfit    = operatingProfit + netOther;

    res.json({
      ...data,
      totalRevenue,
      totalCOGS,
      grossProfit,
      totalOperatingExpenses: totalOpEx,
      operatingProfit,
      netOther,
      netProfit
    });
  } catch (err) {
    res.status(500).send('Error computing summary: ' + err.message);
  }
});

export default router;
