import React, { useState, useEffect } from "react";
import axios from "axios";

const BalanceSheetUpdate = () => {
  const [balanceSheet, setBalanceSheet] = useState({
    assets: "",
    liabilities: "",
    equity: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBalanceSheet();
  }, []);

  // Fetch the balance sheet data
  const fetchBalanceSheet = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/balance-sheet");
      setBalanceSheet(response.data);
    } catch (error) {
      console.error("Error fetching balance sheet:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBalanceSheet((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle balance sheet update
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:5000/api/balance-sheet",
        balanceSheet
      );
      setMessage("Balance Sheet updated successfully!");
      fetchBalanceSheet(); // Fetch updated data
    } catch (error) {
      setMessage("Error updating balance sheet.");
      console.error("Error updating balance sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle balance sheet deletion
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete("http://localhost:5000/api/balance-sheet");
      setMessage("Balance Sheet deleted successfully!");
      setBalanceSheet({ assets: "", liabilities: "", equity: "" }); // Clear the form
    } catch (error) {
      setMessage("Error deleting balance sheet.");
      console.error("Error deleting balance sheet:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Balance Sheet</h2>
      
      {message && <div className="alert alert-info">{message}</div>}

      <div className="card">
        <div className="card-header">
          <h5>Balance Sheet Details</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="assets">Assets</label>
            <input
              type="text"
              id="assets"
              name="assets"
              className="form-control"
              value={balanceSheet.assets}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="liabilities">Liabilities</label>
            <input
              type="text"
              id="liabilities"
              name="liabilities"
              className="form-control"
              value={balanceSheet.liabilities}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="equity">Equity</label>
            <input
              type="text"
              id="equity"
              name="equity"
              className="form-control"
              value={balanceSheet.equity}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={handleUpdate}
            className="btn btn-success mt-3"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Balance Sheet"}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger mt-3 ml-2"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Balance Sheet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetUpdate;
