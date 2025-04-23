import express from "express";
import {
  addBalanceSheet,
  getBalanceSheets,
  updateBalanceSheet,
  deleteBalanceSheet,
  generateBalanceSheetPDF,
  getBalanceSheetById,
} from "../controllers/balanceSheetController.js";

import PDFDocument from 'pdfkit'; // Import PDFKit correctly

import BalanceSheet from '../models/BalanceSheet.js';


const router = express.Router();

// 📌 Add Balance Sheet
router.post("/add", addBalanceSheet);

// 📌 Get All Balance Sheets
router.get("/all", getBalanceSheets);

// 📌 Get Balance Sheet by ID (New Route)
router.get("/:id", getBalanceSheetById); // This route is for fetching a single balance sheet by its ID

// 📌 Update Balance Sheet by ID
router.put("/update/:id", updateBalanceSheet);

// 📌 Delete Balance Sheet by ID
router.delete("/delete/:id", deleteBalanceSheet);

// Routes for generating balance sheet reports
router.get('/pdf', generateBalanceSheetPDF);


// GET /api/balance-sheet/download/:id
router.get('/download/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the balance sheet by ID
    const sheet = await BalanceSheet.findById(id);

    if (!sheet) {
      return res.status(404).send('Balance sheet not found');
    }

    // PDF generation code
    const doc = new PDFDocument();
    res.setHeader('Content-Disposition', `attachment; filename="${sheet.description}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);
    doc.fontSize(16).text(`Balance Sheet: ${sheet.description}`);
    doc.moveDown();

    // Example: Log the sheet to check its contents
    console.log(sheet);

    // Add content from balance sheet
    doc.text('Assets');
    Object.entries(sheet.assets.currentAssets).forEach(([key, val]) =>
      doc.text(`- ${key}: ${val}`)
    );

    doc.end();
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});


export default router;
