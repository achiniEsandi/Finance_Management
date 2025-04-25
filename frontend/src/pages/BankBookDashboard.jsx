import React, { useState } from "react";
import BankAccountForm from "../components/BankAccountForm";
import BankAccountList from "../components/BankAccountList";

export default function BankBookDashboard() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(r => !r);

  return (
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <h2>Bank Book Dashboard</h2><br></br>
      {/* Add Bank Account */}
      <div className="p-4 border rounded shadow-sm">
      
        <h2 className="text-xl font-semibold mb-4">Add New Bank Account</h2>
        <BankAccountForm onAdd={triggerRefresh} />
      </div>

      {/* List Bank Accounts */}
      <div className="md:col-span-2 p-4 border rounded shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Accounts & Transactions</h2>
        <BankAccountList refresh={refresh} />
      </div>
    </div>
  );
}
