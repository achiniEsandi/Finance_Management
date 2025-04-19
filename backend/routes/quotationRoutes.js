const express = require('express');
const {
  createQuotation,
  getQuotations,
  getQuotationById,
  deleteQuotation,
  sendQuotationEmail,
  updateQuotationStatus, // Add this import for the status update function
} = require('../controllers/quotationController');
const router = express.Router();

// Create a new quotation
router.post('/', createQuotation);

// Get all quotations
router.get('/', getQuotations);

// Get a specific quotation by ID
router.get('/:id', getQuotationById);

// Delete a quotation by ID
router.delete('/:id', deleteQuotation);

// Send quotation email
router.post('/send-email/:id', sendQuotationEmail);

// Update status of a quotation (Pending -> Accepted/Rejected)
router.put('/:id/status', updateQuotationStatus); // New route for updating the status

module.exports = router;
