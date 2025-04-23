import PDFDocument from 'pdfkit';
import BalanceSheet from "../models/BalanceSheet.js";

// 📌 Add Balance Sheet Entry
export const addBalanceSheet = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    const {
      assets,
      liabilities,
      equity,
      description,
    } = req.body;

    if (!assets || !liabilities || !equity) {
      return res.status(400).json({ message: "All fields must be provided." });
    }

    const newBalanceSheet = new BalanceSheet({
      assets,
      liabilities,
      equity,
      description,
    });

    await newBalanceSheet.save();
    res.status(201).json({ message: "✅ Balance Sheet Added Successfully", balanceSheet: newBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

// 📌 Get All Balance Sheets
export const getBalanceSheets = async (req, res) => {
  try {
    const balanceSheets = await BalanceSheet.find();
    res.status(200).json(balanceSheets);
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error", error: error.message });
  }
};

// 📌 Update Balance Sheet by ID
export const updateBalanceSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedBalanceSheet = await BalanceSheet.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBalanceSheet) {
      return res.status(404).json({ message: "❌ Balance Sheet Not Found" });
    }

    res.status(200).json({ message: "✅ Balance Sheet Updated", updatedBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Error Updating Balance Sheet", error });
  }
};

// 📌 Delete Balance Sheet by ID
export const deleteBalanceSheet = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBalanceSheet = await BalanceSheet.findByIdAndDelete(id);

    if (!deletedBalanceSheet) {
      return res.status(404).json({ message: "❌ Balance Sheet Not Found" });
    }

    res.status(200).json({ message: "✅ Balance Sheet Deleted", deletedBalanceSheet });
  } catch (error) {
    res.status(500).json({ message: "❌ Error Deleting Balance Sheet", error });
  }
};

// PDF generation logic
// 📌 Generate and Download Balance Sheet PDF
export const downloadBalanceSheetPDF = async (req, res) => {
  try {
    const balanceSheets = await BalanceSheet.find();

    if (!balanceSheets.length) {
      return res.status(404).json({ message: "No balance sheets found" });
    }

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=balance-sheets.pdf');
    doc.pipe(res);

    // Add Company Branding
    const logoPath = "images/logo.jpg";
    doc.image(logoPath, 50, 50, { width: 100 });

    doc.fontSize(20).text("Cosmo Exports Lanka (PVT) LTD", 50, 120, { align: "center" });
    doc.fontSize(12).text("496/1, Naduhena, Meegoda, Sri Lanka", { align: "center" });
    doc.text("Phone: +94 77 086 4011  +94 11 275 2373 | Email: cosmoexportslanka@gmail.com", { align: "center" });
    doc.moveDown(2);

    doc.fontSize(18).text("Detailed Balance Sheet Report", { align: "center" });
    doc.moveDown();

    balanceSheets.forEach((sheet, index) => {
      doc.addPage(); // Add new page for each sheet if needed
      doc.fontSize(14).text(`Balance Sheet #${index + 1}`, { underline: true });
      doc.moveDown();

      // Assets
      doc.fontSize(12).text("Assets", { underline: true });
      doc.text("Current Assets:");
      const ca = sheet.assets.currentAssets || {};
      doc.text(`- Cash & Bank Balances: ${ca.cashBankBalances}`);
      doc.text(`- Accounts Receivable: ${ca.accountsReceivable}`);
      doc.text(`- Inventory: ${ca.inventory}`);
      doc.text(`- Prepaid Expenses: ${ca.prepaidExpenses}`);
      doc.moveDown();

      doc.text("Non-Current Assets:");
      const nca = sheet.assets.nonCurrentAssets || {};
      doc.text(`- Property, Plant & Equipment: ${nca.propertyPlantEquipment}`);
      doc.text(`- Machinery & Tools: ${nca.machineryTools}`);
      doc.text(`- Vehicles: ${nca.vehicles}`);
      doc.text(`- Intangible Assets: ${nca.intangibleAssets}`);
      doc.moveDown();

      // Liabilities
      doc.fontSize(12).text("Liabilities", { underline: true });
      doc.text("Current Liabilities:");
      const cl = sheet.liabilities.currentLiabilities || {};
      doc.text(`- Accounts Payable: ${cl.accountsPayable}`);
      doc.text(`- Short-Term Loans: ${cl.shortTermLoans}`);
      doc.text(`- Taxes Payable: ${cl.taxesPayable}`);
      doc.text(`- Wages Payable: ${cl.wagesPayable}`);
      doc.moveDown();

      doc.text("Non-Current Liabilities:");
      const ncl = sheet.liabilities.nonCurrentLiabilities || {};
      doc.text(`- Long-Term Loans: ${ncl.longTermLoans}`);
      doc.text(`- Lease Obligations: ${ncl.leaseObligations}`);
      doc.text(`- Deferred Tax Liabilities: ${ncl.deferredTaxLiabilities}`);
      doc.moveDown();

      // Equity
      doc.fontSize(12).text("Equity", { underline: true });
      const eq = sheet.equity || {};
      doc.text(`- Owner’s Capital: ${eq.ownersCapital}`);
      doc.text(`- Retained Earnings: ${eq.retainedEarnings}`);
      doc.text(`- Shareholder Contributions: ${eq.shareholderContributions}`);
      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "❌ Error generating PDF report", error });
  }
};





// 📌 Get Balance Sheet by ID
export const getBalanceSheetById = async (req, res) => {
  const { id } = req.params;
  try {
    const balanceSheet = await BalanceSheet.findById(id);  // Use the correct model method to fetch by ID
    if (!balanceSheet) {
      return res.status(404).json({ message: "Balance Sheet not found" });
    }
    res.json(balanceSheet);
  } catch (error) {
    console.error("Error fetching balance sheet by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

