import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initialFormState = {
  assets: {
    currentAssets: {
      cashBankBalances: '',
      accountsReceivable: '',
      inventory: '',
      prepaidExpenses: ''
    },
    nonCurrentAssets: {
      propertyPlantEquipment: '',
      machineryTools: '',
      vehicles: '',
      intangibleAssets: ''
    }
  },
  liabilities: {
    currentLiabilities: {
      accountsPayable: '',
      shortTermLoans: '',
      taxesPayable: '',
      wagesPayable: ''
    },
    nonCurrentLiabilities: {
      longTermLoans: '',
      leaseObligations: '',
      deferredTaxLiabilities: ''
    }
  },
  equity: {
    ownersCapital: '',
    retainedEarnings: '',
    shareholderContributions: ''
  },
  description: '',
  date: new Date(),
};

const BalanceSheetForm = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (section, category, field, value) => {
    if (value < 0) return;
    
    setFormData(prev => ({
      ...prev,
      [section]: category ? {
        ...prev[section],
        [category]: {
          ...prev[section][category],
          [field]: value
        }
      } : {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTextChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatLabel = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
      alert('Please enter a description');
      return;
    }

    // Prepare data for submission
    const dataToSend = {
      ...formData,
      assets: {
        currentAssets: Object.fromEntries(
          Object.entries(formData.assets.currentAssets).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
        ),
        nonCurrentAssets: Object.fromEntries(
          Object.entries(formData.assets.nonCurrentAssets).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
        )
      },
      liabilities: {
        currentLiabilities: Object.fromEntries(
          Object.entries(formData.liabilities.currentLiabilities).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
        ),
        nonCurrentLiabilities: Object.fromEntries(
          Object.entries(formData.liabilities.nonCurrentLiabilities).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
        )
      },
      equity: Object.fromEntries(
        Object.entries(formData.equity).map(([key, val]) => [key, val === '' ? 0 : Number(val)])
      )
    };

    try {
      const response = await fetch('http://localhost:5000/api/balance-sheet/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Submission failed');
      }

      alert('Balance sheet submitted successfully!');
      setFormData(initialFormState);
    } catch (err) {
      console.error('Error submitting balance sheet:', err);
      alert('Failed to submit balance sheet');
    }
  };

  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Balance Sheet Entry</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={(e) => handleTextChange('description', e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleTextChange('date', date)}
            dateFormat="yyyy-MM-dd"
            className="w-full p-2 border rounded"
            minDate={oneMonthAgo}
            maxDate={today}
            required
          />
        </div>

        {/* Assets Section */}
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-bold mb-4">Assets</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Current Assets</h3>
            <div className="space-y-3">
              {Object.entries(formData.assets.currentAssets).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-5">{formatLabel(key)}</label>
                  <input
                    type="number"
                    className="col-span-5 p-2 border rounded"
                    value={value}
                    onChange={(e) => handleChange('assets', 'currentAssets', key, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Non-Current Assets</h3>
            <div className="space-y-3">
              {Object.entries(formData.assets.nonCurrentAssets).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-5">{formatLabel(key)}</label>
                  <input
                    type="number"
                    className="col-span-5 p-2 border rounded"
                    value={value}
                    onChange={(e) => handleChange('assets', 'nonCurrentAssets', key, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liabilities Section */}
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-bold mb-4">Liabilities</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Current Liabilities</h3>
            <div className="space-y-3">
              {Object.entries(formData.liabilities.currentLiabilities).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-5">{formatLabel(key)}</label>
                  <input
                    type="number"
                    className="col-span-5 p-2 border rounded"
                    value={value}
                    onChange={(e) => handleChange('liabilities', 'currentLiabilities', key, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Non-Current Liabilities</h3>
            <div className="space-y-3">
              {Object.entries(formData.liabilities.nonCurrentLiabilities).map(([key, value]) => (
                <div key={key} className="grid grid-cols-12 gap-4 items-center">
                  <label className="col-span-5">{formatLabel(key)}</label>
                  <input
                    type="number"
                    className="col-span-5 p-2 border rounded"
                    value={value}
                    onChange={(e) => handleChange('liabilities', 'nonCurrentLiabilities', key, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Equity Section */}
        <div className="border rounded-md p-4">
          <h2 className="text-xl font-bold mb-4">Equity</h2>
          <div className="space-y-3">
            {Object.entries(formData.equity).map(([key, value]) => (
              <div key={key} className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-5">{formatLabel(key)}</label>
                <input
                  type="number"
                  className="col-span-5 p-2 border rounded"
                  value={value}
                  onChange={(e) => handleChange('equity', null, key, e.target.value)}
                  min="0"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Balance Sheet
        </button>
      </form>
    </div>
  );
};

export default BalanceSheetForm;