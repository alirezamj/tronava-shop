import express from 'express';
import { showHome } from '../controllers/main.controller.js';
import Product from '../models/product.model.js';
const router = express.Router();

router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.render('category', { products,
       category,
       isLoggedIn: req.isAuthenticated() });
  } catch (err) {
    console.error('Error fetching category products:', err);
    res.status(500).send('Error fetching products...');
  }
});





router.get('/', showHome);

export default router;
