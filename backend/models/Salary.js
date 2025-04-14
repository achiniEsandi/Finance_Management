import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  deductions: { type: Number, default: 0 },
  epf: { type: Number },
  etf: { type: Number },
  netSalary: { type: Number },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Salary", salarySchema);
