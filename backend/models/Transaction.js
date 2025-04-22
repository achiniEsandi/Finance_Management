import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  source: {
    type: String,
    enum: ['manual', 'petty_cash'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  category: {
    type: String,
    default: 'General',
  },
  date: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

export default mongoose.model('Transaction', transactionSchema);
