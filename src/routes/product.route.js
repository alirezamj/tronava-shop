import express from 'express';
import { showProducts } from '../controllers/product.controller.js';
import { getProductDetails } from '../controllers/product.controller.js';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import { syncCartSession } from '../helper/syncCart.js';
import { isValidObject } from '../helper/validateObjectId.js';


const router = express.Router();

router.get('/', showProducts);


router.get('/cart', async (req, res) => {
   await syncCartSession(req);
   const cart = req.session.cart || { items: {}, totalQty: 0, totalPrice: 0};
   res.render('cart', { cart });
});


router.get('/:id', getProductDetails);





router.post('/add-to-cart/:id', async (req, res) => {
    const productId = req.params.id;
    if(!isValidObject(productId)) return res.status(400).send('شناسه نامعتبر است');
    const product = await Product.findById(productId);
    if (!product) return res.redirect('/');

    //مدیریت session
    const cart = req.session.cart || { items: {}, totalQty: 0 , totalPrice: 0};

    if(!cart.items[productId]) {
        cart.items[productId] = { product, quantity: 1};
    }else{
        cart.items[productId].quantity += 1;
    }

    cart.totalQty += 1;
    cart.totalPrice += product.price;
    req.session.cart = cart;

    //save in db
    if (req.user) {
        let dbCart = await Cart.findOne({ user: req.user._id});
        if (!dbCart) dbCart = new Cart({ user: req.user._id, items: []});

        const existingItem = dbCart.items.find(item => item.product.equals(productId));
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            dbCart.items.push({ product: productId, quantity: 1});
        }
        await dbCart.save();
    }
    res.redirect('/products/cart');
});

router.post('/remove-from-cart/:id', async (req, res) => {
    const productId = req.params.id;

    //delete from session
    const cart = req.session.cart;
    if ( cart && cart.items[productId]) {
        cart.totalQty -= cart.items[productId].quantity;
        cart.totalPrice -= cart.items[productId].product.price * cart.items[productId].quantity;
        delete cart.items[productId];
        req.session.cart = cart;
    }

    //delete from db
    if(req.user) {
        const dbCart = await Cart.findOne({ user: req.user._id });
        if (dbCart) {
            dbCart.items = dbCart.items.filter(item => !item.product.equals(productId));
            await dbCart.save();
        }
    }
    res.redirect('/products/cart');
})

export default router;

