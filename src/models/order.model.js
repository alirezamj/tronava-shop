import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products: [{
        products: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: {type: Number, default: 1}
    }],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped'],
        default: 'pending'
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
export default Order;