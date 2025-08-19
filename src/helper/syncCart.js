import Cart from "../models/cart.model.js";

export async function syncCartSession(req) {
    if (!req.user) return;

    const dbCart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!dbCart) return;

    const items = {};
    let totalQty = 0;
    let totalPrice = 0;

    dbCart.items.forEach(item => {
        items[item.product._id] = {
            product : item.product,
            quantity : item.quantity
        };
        totalQty += item.quantity;
        totalPrice += item.product.price * item.quantity;
    })
}