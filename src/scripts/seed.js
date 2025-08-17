import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFile } from 'fs/promises';
import path from 'path';
import Product from '../models/product.model.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedProducts = async () => {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🛜 Connected to MongoDB');

    console.log('🧹 Clearing existing products...');
    await Product.deleteMany();

    const filePath = path.resolve(__dirname, 'testData.json');
    const data = await readFile(filePath, 'utf-8');
    const products = JSON.parse(data);

    console.log(`📦 Seeding ${products.length} products...`);
    await Product.insertMany(products);

    console.log('✅ Products seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
};

seedProducts();