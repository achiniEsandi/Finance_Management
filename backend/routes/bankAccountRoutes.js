import express from 'express';
import { 
    createBankAccount, 
    updateBankAccount,
    deleteBankAccount

} from '../controllers/bankAccountController.js';


  

const router = express.Router();

// Route to create a bank account
router.post('/create', createBankAccount);


router.put("/update/:accountNumber", updateBankAccount);
router.delete("/delete/:accountNumber", deleteBankAccount);

export default router;
