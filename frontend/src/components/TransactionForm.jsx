import React, { useState } from "react";
import axios from "axios";

const TransactionForm = ({ account, onTransaction }) => {
  const [form, setForm] = useState({
    amount: "",
    transactionType: "deposit",
    description: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/bank-book/add-transaction", {
      accountNumber: account.accountNumber,
      amount: parseFloat(form.amount),
      transactionType: form.transactionType,
      description: form.description,
    });
    setForm({ amount: "", transactionType: "deposit", description: "" });
    onTransaction();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded shadow">
      <h3 className="font-bold">Add Transaction for {account.bankName}</h3>
      <input name="amount" type="number" placeholder="Amount" onChange={handleChange} value={form.amount} className="input" />
      <select name="transactionType" onChange={handleChange} value={form.transactionType} className="input">
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
      </select>
      <input name="description" placeholder="Description" onChange={handleChange} value={form.description} className="input" />
      <button type="submit" className="btn">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
