import express from 'express';
import { showProducts } from '../controllers/product.controller.js';
import { getProductDetails } from '../controllers/product.controller.js';




const router = express.Router();

router.get('/', showProducts);
router.get('/products/:id', getProductDetails);

export default router;

