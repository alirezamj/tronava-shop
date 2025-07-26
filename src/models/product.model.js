import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required:true,
        min: 0
    },
    category: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '/images/default.jpg'
    },
    stock: {
        type: Number,
        default: 0
    },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;
