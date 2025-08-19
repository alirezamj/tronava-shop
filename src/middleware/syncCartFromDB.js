import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";


export default async function syncCartFromDB(req,res,next) {
    if(!req.user || req.session.cart) return next();

    if(!req.session) {
        console.warn('session is undefined in syncCartFromDB');
        returnnext();
    }
    const dbCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if(!dbCart) return next();

    const sessionCart = { items: {}, totalQty: 0, totalPrice: 0};

    dbCart.items.forEach(item => {
        sessionCart.items[item.product._id] = {
            product: item.product,
            quantity: item.quantity
        };
        sessionCart.totalQty += item.quantity;
        sessionCart.totalPrice += item.product.price * item.quantity;
    });

    req.session.cart = sessionCart;
    next();
};