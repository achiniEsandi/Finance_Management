import React, { useEffect, useState } from "react";
import axios from "axios";
import BankAccountForm from "./BankAccountForm";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import BankStatementButton from "./BankStatementButton";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const fetchAccounts = async () => {
    try {
      const res = await axios.get("/api/bank-account");
      // Log response data to debug
      console.log(res.data);
      setAccounts(Array.isArray(res.data) ? res.data : []);  // Ensure it's an array
    } catch (error) {
      console.error("Error fetching accounts:", error);
      setAccounts([]);  // Fallback to empty array in case of error
    }
  };
  
  

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Bank Book Management</h1>
      <BankAccountForm onAccountAdded={fetchAccounts} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc._id}
            onClick={() => setSelectedAccount(acc)}
            className="border p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{acc.bankName}</h2>
            <p>Account: {acc.accountNumber}</p>
            <p>Balance: ₹{acc.balance}</p>
          </div>
        ))}
      </div>

      {selectedAccount && (
        <>
          <TransactionForm account={selectedAccount} onTransaction={fetchAccounts} />
          <TransactionList accountId={selectedAccount._id} />
          <BankStatementButton accountId={selectedAccount._id} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
