import mongoose from "mongoose";
import Product from "./product.model.js";

const cartItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: { type: Number, default: 1},
});
 
const cartSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true, unique: true},
    items: [cartItemSchema],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;