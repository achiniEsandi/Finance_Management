import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bank-book/add-transaction")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div>
      <h3>Transactions</h3>
      <ul className="list-group">
        {transactions.map((txn) => (
          <li key={txn._id} className="list-group-item">
            <strong>{txn.transaction_type.toUpperCase()}</strong>: ${txn.amount} – {txn.description}
            <div><small>Date: {new Date(txn.transactionDate).toLocaleString()}</small></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
