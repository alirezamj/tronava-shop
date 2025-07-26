import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/product.model.js';

dotenv.config();
console.log('🔍 MONGO_URI:', process.env.MONGO_URI);


const seedProducts = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('🛜 Connected to MongoDB');


        await Product.deleteMany();
        const products = await Product.insertMany([
         {
      title: 'Wireless Mouse',
      description: 'Smooth and responsive ergonomic mouse',
      price: 29.99,
      category: 'Electronics',
      imageUrl: '/images/mouse.jpg',
      stock: 50
    },
    {
      title: 'Canvas Backpack',
      description: 'Stylish and durable, perfect for everyday carry',
      price: 44.95,
      category: 'Fashion',
      imageUrl: '/images/backpack.jpg',
      stock: 30
    }
    ]);
    console.log('✅ Seeded products');
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
}catch (err) {
    console.error('❌ Seeding failed:', err.message);

}

};

seedProducts();