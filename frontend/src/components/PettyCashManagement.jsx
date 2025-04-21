import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isAfter, isBefore, subMonths } from "date-fns";

const PettyCashManagement = () => {
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    description: "",
    transactionDate: null,
    id: "", // Store ID for update
  });

  const [entries, setEntries] = useState([]);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/pettycash/");
      setEntries(res.data.reverse());
    } catch (err) {
      console.error("Failed to fetch entries:", err);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/pettycash/generate-report", { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'petty_cash_report.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error generating report:", err);
      alert("Failed to generate report: " + (err.response ? err.response.data.message : err.message));
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
  };

  const handleDateChange = (date) => {
    setNewTransaction((prev) => ({ ...prev, transactionDate: date }));
    validateInput("transactionDate", date);
  };

  const validateInput = (name, value) => {
    const today = new Date();
    const oneMonthAgo = subMonths(today, 1);
    let newErrors = { ...errors };

    if (name === "amount") {
      const amount = parseFloat(value);
      if (amount <= 0) {
        newErrors.amount = "Amount must be greater than 0.";
      } else if (amount > 5000) {
        newErrors.amount = "Amount cannot exceed LKR 5000.";
      } else {
        delete newErrors.amount;
      }
    }

    if (name === "transactionDate") {
      if (!value) {
        newErrors.transactionDate = "Date is required.";
      } else if (isAfter(value, today)) {
        newErrors.transactionDate = "Future dates are not allowed.";
      } else if (isBefore(value, oneMonthAgo)) {
        newErrors.transactionDate = "Date cannot be older than 1 month.";
      } else {
        delete newErrors.transactionDate;
      }
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTransaction.amount || !newTransaction.description || !newTransaction.transactionDate) {
      setErrors({ form: "All fields are required." });
      return;
    }

    if (Object.keys(errors).length > 0) return;

    try {
      const payload = {
        ...newTransaction,
        transactionDate: newTransaction.transactionDate.toISOString(),
      };

      if (newTransaction.id) {
        // Update existing entry
        await axios.put(`http://localhost:5000/api/pettycash/update/${newTransaction.id}`, payload);
        setSuccessMessage("Transaction updated successfully!");
      } else {
        // Add new entry
        await axios.post("http://localhost:5000/api/pettycash/add", payload);
        setSuccessMessage("Transaction added successfully!");
      }

      setNewTransaction({ amount: "", description: "", transactionDate: null, id: "" });
      setErrors({});
      fetchEntries(); // refresh list
    } catch (err) {
      setErrors({ submit: err.response?.data || "Failed to add/update transaction." });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pettycash/delete/${id}`);
      setSuccessMessage("Transaction deleted successfully!");
      fetchEntries(); // refresh list
    } catch (err) {
      setErrors({ submit: "Failed to delete transaction." });
    }
  };

  const handleUpdate = (entry) => {
    setNewTransaction({
      amount: entry.amount,
      description: entry.description,
      transactionDate: new Date(entry.transactionDate),
      id: entry._id,
    });
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-GB");

  return (
    <div className="container mt-4">
      <h2>Petty Cash Management</h2>
      <p>All the expenses under LKR 5000 are considered here.</p>

      {/* Form */}
      <div className="col-md-8 mb-4">
        <div className="card">
          <div className="card-header bg-info text-white">
            <h5>{newTransaction.id ? "Update Expense" : "Add New Expense"}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              {errors.form && <p className="text-danger">{errors.form}</p>}
              {errors.submit && <p className="text-danger">{errors.submit}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}

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
                {errors.amount && <small className="text-danger">{errors.amount}</small>}
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
              </div><br />

              <div className="form-group">
                <label>Date:</label> &nbsp;
                <DatePicker
                  selected={newTransaction.transactionDate}
                  onChange={handleDateChange}
                  className="form-control"
                  maxDate={new Date()}
                  minDate={subMonths(new Date(), 1)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select a date"
                  isClearable
                  showMonthDropdown
                  showYearDropdown
                />
                {errors.transactionDate && (
                  <small className="text-danger">{errors.transactionDate}</small>
                )}
              </div>

              <button type="submit" className="btn btn-success  mt-3">
                <i className="fas fa-plus-circle"></i>&nbsp; {newTransaction.id ? "Update" : "Add"} Expense
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <div className="card-header bg-secondary text-white">
          <h5>Recorded Expenses</h5>
        </div>
        <div className="card-body">
          {entries.length === 0 ? (
            <p>No entries found.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount (LKR)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>{formatDate(entry.transactionDate)}</td>
                    <td>{entry.description}</td>
                    <td>{entry.amount.toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleUpdate(entry)}
                      >
                        Edit
                      </button> &nbsp;
                      <button
                        className="btn btn-danger btn-sm ml-4"
                        onClick={() => handleDelete(entry._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>


      </div>

      {/* Button to generate petty cash report */}
        <div className="col-md-8 mb-4">
          <button
            className="btn btn-primary"
            onClick={handleGenerateReport}
          >
            Generate Petty Cash Report
          </button>
        </div>
    </div>
  );
};

export default PettyCashManagement;
