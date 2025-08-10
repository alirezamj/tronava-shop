import express from "express";
import { loginUser, registerUser, logOut } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../middleware/validators.js";
import  validateRequest from "../middleware/validateRequest.js";



const router = express.Router();


router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);
router.get('/logout', logOut);

export default router;