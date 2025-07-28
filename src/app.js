import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import mainRouter from './routes/main.route.js';
import productRouter from './routes/product.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import User from './models/user.model.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Db connection
connectDB();


//set EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');


// 🌟 Static & middleware setup

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(express.json());


// 🔐 Global user detection middleware
app.use(async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
      try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
          } catch (err) {
            console.error('JWT verification failed:', err.message);

          }
      }
      res.locals.user = req.user;
  next();
});



//This lets Express read form data like req.body.username, req.body.email, etc.


// 📦 Your routes come after this
app.use('/', mainRouter);
app.use('/products', productRouter);
app.use('/shop/product-details', productRouter);
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