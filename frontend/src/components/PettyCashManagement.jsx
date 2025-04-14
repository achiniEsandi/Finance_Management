import React, { useState } from "react";

const PettyCashManagement = () => {
  const [newTransaction, setNewTransaction] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction Added:", newTransaction);
    // Add logic to store the transaction (e.g., API call or local state update)
    setNewTransaction({ type: "", amount: "", description: "" }); // Reset form
  };

  return (
    <div className="container mt-4">
      <h2>Petty Cash Management</h2>
      <p>All the expenses under LKR 5000 are considered here.</p>



      {/* Add New Transaction */}
      <div className="col-md-8">
        <div className="card">
          <div className="card-header bg-info text-white">
            <h5>Add New Transaction</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Type:</label>
                <select
                  name="type"
                  value={newTransaction.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="sales">Sales</option>
                </select>
              </div>

              <div className="form-group">
                <label>Amount:</label>
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
                <i className="fas fa-plus-circle"></i>&nbsp; Add Transaction
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PettyCashManagement;
