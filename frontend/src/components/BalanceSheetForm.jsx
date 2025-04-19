import React, { useState } from 'react';

const BalanceSheetForm = () => {
  const [company, setCompany] = useState('');
  const [assets, setAssets] = useState([{ name: '', amount: '' }]);
  const [liabilities, setLiabilities] = useState([{ name: '', amount: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (setter, index, key, value) => {
    setter(prev => {
      const updated = [...prev];
      updated[index][key] = value;
      return updated;
    });
  };

  const addRow = setter => setter(prev => [...prev, { name: '', amount: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/balance-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, assets, liabilities }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'PDF generation failed');
      }

      const blob = await response.blob();
      const fileURL = window.URL.createObjectURL(blob);
      window.open(fileURL);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Generate Balance Sheet</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Company Name</label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Assets</h3>
          {assets.map((asset, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={asset.name}
                onChange={(e) => handleChange(setAssets, index, 'name', e.target.value)}
                required
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={asset.amount}
                onChange={(e) => handleChange(setAssets, index, 'amount', e.target.value)}
                required
                className="flex-1 p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow(setAssets)}
            className="text-blue-600 hover:underline"
          >
            + Add Asset
          </button>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Liabilities</h3>
          {liabilities.map((liability, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={liability.name}
                onChange={(e) => handleChange(setLiabilities, index, 'name', e.target.value)}
                required
                className="flex-1 p-2 border rounded"
              />
              <input
                type="number"
                placeholder="Amount"
                value={liability.amount}
                onChange={(e) => handleChange(setLiabilities, index, 'amount', e.target.value)}
                required
                className="flex-1 p-2 border rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => addRow(setLiabilities)}
            className="text-blue-600 hover:underline"
          >
            + Add Liability
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Generating PDF...' : 'Generate Balance Sheet PDF'}
        </button>
      </form>
    </div>
  );
};

export default BalanceSheetForm;
