import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middleware/validators.js";
import  validateRequest from "../middleware/validateRequest.js";



const router = express.Router();


router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);

export default router;