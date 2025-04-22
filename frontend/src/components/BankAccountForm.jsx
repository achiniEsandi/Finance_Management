import React, { useState } from "react";
import axios from "axios";

const BankAccountForm = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    balance: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bank-account/create", formData);
      alert("Bank account created!");
    } catch (err) {
      console.error("Error creating account:", err);
      alert("Failed to create account.");
    }
  };

  return (
    <div>
      <h3>Create Bank Account</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Bank Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label>Account Number</label>
          <input
            type="text"
            className="form-control"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <label>Initial Balance</label>
          <input
            type="number"
            className="form-control"
            value={formData.balance}
            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
          />
        </div>
        <button className="btn btn-success" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default BankAccountForm;
