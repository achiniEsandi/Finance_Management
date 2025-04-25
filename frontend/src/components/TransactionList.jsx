import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionList = ({ accountId }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTxs = async () => {
      const res = await axios.get("/api/bank-book/transactions");
      setTransactions(res.data.filter((tx) => tx.bank_account_id === accountId));
    };
    fetchTxs();
  }, [accountId]);

  return (
    <div className="mt-6">
      <h3 className="font-bold">Transaction History</h3>
      <ul className="divide-y">
        {transactions.map((tx) => (
          <li key={tx._id} className="py-2">
            <strong>{tx.transaction_type.toUpperCase()}</strong> ₹{tx.amount} – {tx.description} <br />
            Balance: ₹{tx.current_balance} on {new Date(tx.transactionDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
