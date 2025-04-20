import express from "express";
import {
  addBalanceSheet,
  getBalanceSheets,
  updateBalanceSheet,
  deleteBalanceSheet,
  generateBalanceSheetPDF,
  getBalanceSheetById,
} from "../controllers/balanceSheetController.js";

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



export default router;
