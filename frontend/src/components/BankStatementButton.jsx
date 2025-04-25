import React from "react";

const BankStatementButton = ({ accountId }) => {
  const generatePDF = () => {
    window.open(`/api/pdf/generate-statement/${accountId}`, "_blank");
  };

  return (
    <div className="mt-4">
      <button onClick={generatePDF} className="btn bg-indigo-600 text-white">
        Generate Bank Statement PDF
      </button>
    </div>
  );
};

export default BankStatementButton;
