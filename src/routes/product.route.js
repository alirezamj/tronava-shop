import express from 'express';
import { showProducts } from '../controllers/product.controller.js';
import { getProductDetails } from '../controllers/product.controller.js';
import Product from '../models/product.model.js';




const router = express.Router();

router.get('/', showProducts);


router.get('/cart', (req, res) => {
    const cart = req.session.cart || { items: {}, totalQty:0, totalPrice:0};
    res.render('cart', { cart });
})


router.get('/:id', getProductDetails);





router.post('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    const cart = req.session.cart || { items: {}, totalQty: 0 , totalPrice: 0};

    const product = await Product.findById(productId);
    if (!product) return res.redirect('/');

    if(!cart.items[productId]) {
        cart.items[productId] = { product, quantity: 1};
    }else{
        cart.items[productId].quantity += 1;
    }

    cart.totalQty += 1;
    cart.totalPrice += product.price;

    req.session.cart = cart;
    res.redirect('/products/cart');
})

export default router;

