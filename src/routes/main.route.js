import express from 'express';
import { showHome } from '../controllers/main.controller.js';


const router = express.Router();

router.get('/', showHome);

export default router;
