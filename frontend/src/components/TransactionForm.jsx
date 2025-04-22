import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    transactionType: "deposit",
    description: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bank-accounts")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("Error fetching accounts:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/bank-book/add-transaction", formData);
      alert("Transaction added!");
    } catch (err) {
      console.error("Error adding transaction:", err);
      alert("Failed to add transaction.");
    }
  };

  return (
    <div>
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Account Number</label>
          <select
            className="form-select"
            value={formData.accountNumber}
            onChange={(e) =>
              setFormData({ ...formData, accountNumber: e.target.value })
            }
          >
            <option value="">Select an account</option>
            {accounts.map((acc) => (
              <option key={acc._id} value={acc.accountNumber}>
                {acc.bankName} – {acc.accountNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>
        <div className="mb-2">
          <label>Type</label>
          <select
            className="form-select"
            value={formData.transactionType}
            onChange={(e) =>
              setFormData({ ...formData, transactionType: e.target.value })
            }
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>
        <div className="mb-2">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
