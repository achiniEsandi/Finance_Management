import React, { useState, useEffect } from "react";

const PettyCashManagement = () => {
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
  });
  const [transactions, setTransactions] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/pettycash/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });
  
      const data = await response.text(); // Read full error response
  
      if (response.ok) {
        alert("Transaction added!");
        setNewTransaction({ amount: "", description: "" });
        fetchTransactions();
        fetchTotalExpense();
      } else {
        alert("Failed to add transaction: " + data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error.message);
    }
  };
  

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pettycash");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchTotalExpense = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pettycash/summary");
      const data = await res.json();
      setTotalExpense(data.totalExpense);
    } catch (error) {
      console.error("Error fetching summary:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchTotalExpense();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Petty Cash Management</h2>
      <p>All the expenses under LKR 5000 are considered here.</p>

      {/* Form */}
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-info text-white">
            <h5>Add New Expense</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Amount (LKR):</label>
                <input
                  type="number"
                  name="amount"
                  value={newTransaction.amount}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={newTransaction.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Add Expense
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Summary and List */}
      <div className="mt-5">
        <h4>Total Petty Cash Expenses: LKR {totalExpense.toFixed(2)}</h4>
        <table className="table table-bordered mt-3">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount (LKR)</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn._id}>
                <td>{new Date(txn.transactionDate).toLocaleDateString()}</td>
                <td>{txn.description}</td>
                <td>{txn.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PettyCashManagement;
