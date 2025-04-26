import React, { useEffect, useState } from 'react';
import bankIcon from '../assets/bank_icon.png';
import axios from 'axios';

const BankBookDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    initialBalance: ''
  });
  const [transactionData, setTransactionData] = useState({
    type: '',
    amount: '',
    remarks: ''
  });
  const [transactions, setTransactions] = useState([]);

  // Fetch bank accounts
  const fetchAccounts = async () => {
    try {
      const { data } = await axios.get('/api/bank-account');
      setAccounts(data);
    } catch (err) {
      console.error('Failed to fetch accounts', err);
    }
  };

  // Fetch transactions for selected account
  const fetchTransactions = async () => {
    if (!selectedAccount) return;
    try {
      const { data } = await axios.get(`/api/bank-book/${selectedAccount._id}/transactions`);
      setTransactions(data);
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

  // Add a new bank account
  const handleAddAccount = async () => {
    try {
      await axios.post('/api/bank-account/create', {
        ...formData,
        initialBalance: parseFloat(formData.initialBalance)
      });
      setFormData({ bankName: '', accountNumber: '', initialBalance: '' });
      fetchAccounts();
    } catch (err) {
      console.error('Failed to add account', err);
    }
  };

  // Delete a bank account
  const handleDeleteAccount = async (accountNumber) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this account?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/bank-account/delete/${accountNumber}`);
      if (selectedAccount?.accountNumber === accountNumber) {
        setSelectedAccount(null);
      }
      fetchAccounts();
    } catch (err) {
      console.error('Failed to delete account', err);
      alert('Error deleting the account.');
    }
  };

  // Add a transaction for the selected account
  const handleAddTransaction = async () => {
    if (!transactionData.type || !transactionData.amount) {
      return alert('Please fill all fields.');
    }
    try {
      // Log transaction data to check if it's being sent properly
      console.log(transactionData);

      // Post transaction to the backend
      await axios.post(`/api/bank-book/${selectedAccount._id}/add-transaction`, {
        transaction_type: transactionData.type,
        amount: parseFloat(transactionData.amount),
        description: transactionData.remarks
      });

      // Clear the form and refresh transaction list
      setTransactionData({ type: '', amount: '', remarks: '' });
      fetchTransactions();
      fetchAccounts();
    } catch (err) {
      console.error('Failed to add transaction', err);
    }
  };

  // Fetch bank accounts on mount
  useEffect(() => {
    fetchAccounts();
  }, []);

  // Fetch transactions when the selected account changes
  useEffect(() => {
    if (selectedAccount) fetchTransactions();
  }, [selectedAccount]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <header className="max-w-4xl mx-auto mb-8 flex items-center space-x-4">
        <img src={bankIcon} alt="Bank" className="h-10 w-10" />
        <h1 className="text-3xl font-extrabold text-gray-800">
          Bank Book Management
        </h1>
      </header>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Add Account Card */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Add New Bank Account
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
              value={formData.bankName}
              onChange={e => setFormData({ ...formData, bankName: e.target.value })}
            >
              <option value="">Select Bank</option>
              <option value="Sampath">Sampath Bank</option>
              <option value="HNB">Hatton National Bank (HNB)</option>
              <option value="Commercial">Commercial Bank</option>
              <option value="Peoples'">People's Bank</option>
            </select>

            <input
              type="text"
              placeholder="Account Number"
              className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
              value={formData.accountNumber}
              onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
            />
            <input
              type="number"
              placeholder="Initial Balance"
              className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
              value={formData.initialBalance}
              onChange={e => setFormData({ ...formData, initialBalance: e.target.value })}
            />
          </div>
          <button
            onClick={handleAddAccount}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2 transition"
          >
            Add Account
          </button>
        </section>

        {/* Account List */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Your Bank Accounts
          </h2>
          <div className="space-y-3">
            {accounts.map(acc => (
              <div
                key={acc._id}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition
                  ${selectedAccount?._id === acc._id ? 'bg-gray-300 border border-black-700 font-bold' : 'bg-gray-100 hover:bg-gray-200'}
                `}
              >
                <button
                  onClick={() => setSelectedAccount(acc)}
                  className="flex-1 text-left"
                >
                  <span className="font-semibold text-gray-300">{acc.bankName}</span> –{' '}
                  <span className="text-gray-300">{acc.accountNumber}</span>{' '}
                  <span className="text-gray-300">(LKR {acc.balance})</span>
                </button>
                <button
                  onClick={() => handleDeleteAccount(acc.accountNumber)}
                  className="ml-4 text-red-600 hover:text-red-800 font-bold"
                  title="Delete Account"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Transactions */}
        {selectedAccount && (
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Transactions for {selectedAccount.bankName}
            </h2>
            <button
              className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                window.open(`/api/pdf/generate-statement/${selectedAccount._id}`, '_blank');
              }}
            >
              Download Bank Statement (PDF)
            </button>

            {/* Transaction Form */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <select
                className="border border-gray-300 rounded px-4 py-2"
                value={transactionData.type}
                onChange={e => setTransactionData({ ...transactionData, type: e.target.value })}
              >
                <option value="">Type</option>
                <option value="deposit">Deposit</option>
                <option value="withdrawal">Withdrawal</option>
                <option value="bank_charge">Bank Charge</option>
                <option value="unknown_deposit">Unknown Deposit</option>
              </select>
              <input
                type="number"
                placeholder="Amount"
                className="border border-gray-300 rounded px-4 py-2"
                value={transactionData.amount}
                onChange={e => setTransactionData({ ...transactionData, amount: e.target.value })}
              />
              <input
                type="text"
                placeholder="Remarks"
                className="border border-gray-300 rounded px-4 py-2"
                value={transactionData.remarks}
                onChange={e => setTransactionData({ ...transactionData, remarks: e.target.value })}
              />
              <button
                onClick={handleAddTransaction}
                className="bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-2 transition"
              >
                Add Transaction
              </button>
            </div>

            {/* Transaction List */}
            {transactions.length === 0 ? (
              <p className="text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {transactions.map(txn => (
                  <li key={txn._id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-gray-800">
                        {txn.transaction_type.replace('_', ' ')} – LKR {txn.amount}
                      </p>
                      <p className="text-sm text-gray-500">
                        {txn.description} •{' '}
                        {txn.createdAt && !isNaN(new Date(txn.createdAt)) ? new Date(txn.createdAt).toLocaleDateString() : ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default BankBookDashboard;
