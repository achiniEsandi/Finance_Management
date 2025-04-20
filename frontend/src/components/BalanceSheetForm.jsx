import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BalanceSheetForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    assets: {
      currentAssets: [
        { label: 'Cash/Bank Balances', value: '' },
        { label: 'Accounts Receivable', value: '' },
        { label: 'Inventory', value: '' },
        { label: 'Prepaid Expenses', value: '' },
      ],
      nonCurrentAssets: [
        { label: 'Property, Plant & Equipment', value: '' },
        { label: 'Machinery & Tools', value: '' },
        { label: 'Vehicles', value: '' },
        { label: 'Intangible Assets', value: '' },
      ],
    },
    liabilities: {
      currentLiabilities: [
        { label: 'Accounts Payable', value: '' },
        { label: 'Short Term Loans', value: '' },
        { label: 'Taxes Payable', value: '' },
        { label: 'Wages Payable', value: '' },
      ],
      nonCurrentLiabilities: [
        { label: 'Long Term Loans', value: '' },
        { label: 'Lease Obligations', value: '' },
        { label: 'Deferred Tax Liabilities', value: '' },
      ],
    },
    equity: [
      { label: "Owner's Capital", value: '' },
      { label: 'Retained Earnings', value: '' },
      { label: 'Shareholder Contributions', value: '' },
    ],
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleChange = (e, section, category, index) => {
    const { name, value } = e.target;
    if (e.target.type === 'number' && value < 0) return;

    setFormData((prev) => {
      const updated = { ...prev };
      if (section === 'assets' || section === 'liabilities') {
        updated[section][category][index].value = value;
      } else if (section === 'equity') {
        updated[section][index].value = value;
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };

  const handleAddField = (section, category) => {
    const newField = { label: '', value: '' };
    setFormData((prev) => {
      const updated = { ...prev };
      if (category) {
        updated[section][category].push(newField);
      } else {
        updated[section].push(newField);
      }
      return updated;
    });
  };

  const handleRemoveField = (section, category, index) => {
    setFormData((prev) => {
      const updated = { ...prev };
      if (category) {
        updated[section][category] = updated[section][category].filter((_, i) => i !== index);
      } else {
        updated[section] = updated[section].filter((_, i) => i !== index);
      }
      return updated;
    });
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => {
      const val = parseFloat(item.value) || 0;
      return sum + val;
    }, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
      alert('Please enter a description');
      return;
    }

    try {
      if (typeof onSubmit === 'function') {
        await onSubmit(formData);
      } else {
        throw new Error('Submit handler not provided');
      }
    } catch (err) {
      console.error(err);
      alert(err.message || 'Submission failed');
    }
  };

  const renderInputList = (section, category) => (
    <>
      {formData[section][category].map((item, index) => (
        <div key={index} className="flex gap-3 mb-2 items-center">
          <input
            type="text"
            placeholder="Label"
            value={item.label}
            onChange={(e) => handleChange(e, section, category, index)}
            className="flex-1 px-3 py-2 border rounded-lg shadow-sm"
          />
          <input
            type="number"
            placeholder="Amount"
            value={item.value}
            onChange={(e) => handleChange(e, section, category, index)}
            className="w-32 px-3 py-2 border rounded-lg shadow-sm"
            min="0"
            step="0.01"
          />
          <button
            type="button"
            onClick={() => handleRemoveField(section, category, index)}
            className="text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => handleAddField(section, category)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm"
      >
        ➕ Add Field
      </button>
      <div className="mt-2 text-right font-medium">
        Total: ${calculateTotal(formData[section][category])}
      </div>
    </>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Add Balance Sheet
      </h2>

      {/* Description and Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) => handleChange(e)}
            placeholder="Balance Sheet Description"
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm"
            required
          />
        </div>
      </div>

      {/* Assets Section */}
      <section className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Assets</h3>
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Current Assets</h4>
          {renderInputList('assets', 'currentAssets')}
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Non-Current Assets</h4>
          {renderInputList('assets', 'nonCurrentAssets')}
        </div>
      </section>

      {/* Liabilities Section */}
      <section className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Liabilities</h3>
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Current Liabilities</h4>
          {renderInputList('liabilities', 'currentLiabilities')}
        </div>
        <div>
          <h4 className="text-md font-medium text-gray-600 mb-2">Non-Current Liabilities</h4>
          {renderInputList('liabilities', 'nonCurrentLiabilities')}
        </div>
      </section>

      {/* Equity Section */}
      <section className="bg-gray-50 p-5 rounded-lg shadow-sm space-y-4">
        <h3 className="text-xl font-semibold text-gray-700">Equity</h3>
        {formData.equity.map((item, index) => (
          <div key={index} className="flex gap-3 mb-2 items-center">
            <input
              type="text"
              placeholder="Label"
              value={item.label}
              onChange={(e) => handleChange(e, 'equity', null, index)}
              className="flex-1 px-3 py-2 border rounded-lg shadow-sm"
            />
            <input
              type="number"
              placeholder="Amount"
              value={item.value}
              onChange={(e) => handleChange(e, 'equity', null, index)}
              className="w-32 px-3 py-2 border rounded-lg shadow-sm"
              min="0"
              step="0.01"
            />
          </div>
        ))}
      </section>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Submit Balance Sheet
      </button>
    </form>
  );
};

BalanceSheetForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default BalanceSheetForm;
