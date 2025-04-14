import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["income", "expense", "salary", "sales"], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now }, // Automatically stores the current date & time
  //date: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false },
});


/*const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  payment_method: { type: String, required: true }, // e.g., "Credit Card"
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Success", "Failed", "Pending"], required: true },
  transaction_date: { type: Date, default: Date.now },
  reference_number: { type: String, required: true }, // Bank or gateway reference
  payment_type: { type: String, required: true }, // "Service Payment" or "Spare Part Purchase"
  remarks: { type: String, default: "" }, // Optional
});
*/

export default mongoose.model("Transaction", transactionSchema);
