import { useEffect, useState } from "react";

export default function BalanceSheetList() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/balance-sheet/all")
      .then((res) => res.json())
      .then((data) => setSheets(data))
      .catch((err) => console.error("Error fetching balance sheets:", err));
  }, []);

  const renderItems = (items = []) =>
    items.length > 0 ? (
      <ul className="list-disc pl-6 text-sm text-gray-700">
        {items.map((item, i) => (
          <li key={i}>
            {item.name || "Unnamed"}: ${item.amount || 0}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-sm text-gray-400">No data</p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">📄 Balance Sheets</h2>

      {sheets.length === 0 ? (
        <p className="text-gray-500">No records found.</p>
      ) : (
        sheets.map((sheet) => (
          <div
            key={sheet._id}
            className="border rounded-lg p-5 bg-white shadow space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-blue-700">
                {sheet.company || "Unnamed Company"}
              </h3>
              <p className="text-sm text-gray-500">📅 {sheet.date}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Assets */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Assets
                </h4>
                <div>
                  <p className="font-medium text-gray-600">Current</p>
                  {renderItems(sheet.assets?.current)}
                </div>
                <div className="mt-2">
                  <p className="font-medium text-gray-600">Non-Current</p>
                  {renderItems(sheet.assets?.nonCurrent)}
                </div>
              </div>

              {/* Liabilities */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Liabilities
                </h4>
                <div>
                  <p className="font-medium text-gray-600">Current</p>
                  {renderItems(sheet.liabilities?.current)}
                </div>
                <div className="mt-2">
                  <p className="font-medium text-gray-600">Non-Current</p>
                  {renderItems(sheet.liabilities?.nonCurrent)}
                </div>
              </div>

              {/* Equity */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Equity
                </h4>
                {renderItems(sheet.equity)}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
