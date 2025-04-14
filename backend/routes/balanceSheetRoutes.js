import express from "express";
import {
  addBalanceSheet,
  getBalanceSheets,
  updateBalanceSheet,
  deleteBalanceSheet,
  generateBalanceSheetPDF,
} from "../controllers/balanceSheetController.js";

const router = express.Router();

// 📌 Add Balance Sheet
router.post("/add", addBalanceSheet);

// 📌 Get All Balance Sheets
router.get("/all", getBalanceSheets);

// 📌 Update Balance Sheet by ID
router.put("/update/:id", updateBalanceSheet);

// 📌 Delete Balance Sheet by ID
router.delete("/delete/:id", deleteBalanceSheet);

// Routes for generating balance sheet reports
router.get('/pdf', generateBalanceSheetPDF);



export default router;
