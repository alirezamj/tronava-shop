import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import mainRouter from './routes/main.route.js';
import productRouter from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';





dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Db connection
connectDB();


//set EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');


//Routes
//This lets Express read form data like req.body.username, req.body.email, etc.
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/', adminRoutes);




app.get('/register', (req, res) => {
      res.render('register');
});
app.get('/login', (req, res) => {
      res.render('login');
});








//Start server
app.listen(PORT, () => {
      console.log(`🚀 Tronava Shop server is running on http://localhost:${PORT}`);

})