import mongoose from 'mongoose';

const pettyCashSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("PettyCash", pettyCashSchema);
