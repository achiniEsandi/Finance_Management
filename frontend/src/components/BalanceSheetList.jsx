import { useEffect, useState } from "react";

export default function BalanceSheetList() {
  const [sheets, setSheets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/balance-sheet/all")
      .then((res) => res.json())
      .then((data) => setSheets(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-bold">Balance Sheets</h2>
      {sheets.length === 0 ? (
        <p>No records found.</p>
      ) : (
        sheets.map((sheet) => (
          <div
            key={sheet._id}
            className="border rounded p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg">{sheet.company}</h3>
            <p className="text-sm text-gray-500">Date: {sheet.date}</p>
            <div className="mt-2">
              <strong>Assets:</strong>
              <ul className="list-disc pl-6">
                {sheet.assets.map((a, i) => (
                  <li key={i}>
                    {a.name}: ${a.amount}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <strong>Liabilities:</strong>
              <ul className="list-disc pl-6">
                {sheet.liabilities.map((l, i) => (
                  <li key={i}>
                    {l.name}: ${l.amount}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
