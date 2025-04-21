import React, { useState } from 'react';

const initialFormState = {
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
};

const BalanceSheetForm = () => {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (section, type, index, value) => {
    if (value < 0) return; // Prevent negative amounts
    const updated = { ...formData };
    if (section === 'equity') {
      updated.equity[index].value = value;
    } else {
      updated[section][type][index].value = value;
    }
    setFormData(updated);
  };

  const handleLabelChange = (section, type, index, value) => {
    const updated = { ...formData };
    if (section === 'equity') {
      updated.equity[index].label = value;
    } else {
      updated[section][type][index].label = value;
    }
    setFormData(updated);
  };

  const addField = (section, type) => {
    const updated = { ...formData };
    const newField = { label: '', value: '' };
    if (section === 'equity') {
      updated.equity.push(newField);
    } else {
      updated[section][type].push(newField);
    }
    setFormData(updated);
  };

  const removeField = (section, type, index) => {
    const updated = { ...formData };
    if (section === 'equity') {
      if (updated.equity.length > 1) updated.equity.splice(index, 1);
    } else {
      if (updated[section][type].length > 1) updated[section][type].splice(index, 1);
    }
    setFormData(updated);
  };

  const handleTextChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description) {
      alert('Please enter a description');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/balance-sheet/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Submission failed');
      }
  
      alert('Balance sheet submitted successfully!');
      
      // Reset form data
      setFormData({
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
    } catch (err) {
      console.error('Error submitting balance sheet:', err);
      alert('Failed to submit balance sheet');
    }
  };
  

  const renderFields = (section, type, fields) => (
    <div className="mb-6 p-4 border rounded-md bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{type.replace(/([A-Z])/g, ' $1')}</h3>
        <button
          type="button"
          onClick={() => addField(section, type)}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add Field
        </button>
      </div>
      {fields.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
          <input
            type="text"
            placeholder="Label"
            className="col-span-5 p-2 border rounded"
            value={item.label}
            onChange={(e) => handleLabelChange(section, type, index, e.target.value)}
          />
          <input
            type="number"
            className="col-span-5 p-2 border rounded"
            value={item.value}
            onChange={(e) => handleChange(section, type, index, e.target.value)}
            min={0}
          />
          <button
            type="button"
            onClick={() => removeField(section, type, index)}
            className="col-span-2 text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-2xl font-bold text-center">Balance Sheet Entry</h2>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={formData.description}
          onChange={(e) => handleTextChange('description', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={formData.date}
          onChange={(e) => handleTextChange('date', e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Assets</h2>
        {renderFields('assets', 'currentAssets', formData.assets.currentAssets)}
        {renderFields('assets', 'nonCurrentAssets', formData.assets.nonCurrentAssets)}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Liabilities</h2>
        {renderFields('liabilities', 'currentLiabilities', formData.liabilities.currentLiabilities)}
        {renderFields('liabilities', 'nonCurrentLiabilities', formData.liabilities.nonCurrentLiabilities)}
      </div>

      <div className="p-4 border rounded-md bg-gray-50">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Equity</h2>
          <button
            type="button"
            onClick={() => addField('equity')}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add Equity
          </button>
        </div>
        {formData.equity.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-center mb-2">
            <input
              type="text"
              className="col-span-5 p-2 border rounded"
              value={item.label}
              placeholder="Label"
              onChange={(e) => handleLabelChange('equity', null, index, e.target.value)}
            />
            <input
              type="number"
              className="col-span-5 p-2 border rounded"
              value={item.value}
              onChange={(e) => handleChange('equity', null, index, e.target.value)}
              min={0}
            />
            <button
              type="button"
              onClick={() => removeField('equity', null, index)}
              className="col-span-2 text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Balance Sheet
        </button>
      </div>
    </form>
  );
};

export default BalanceSheetForm;
