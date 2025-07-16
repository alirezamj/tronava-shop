import express from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes/main.route.js';
import { connectDB } from './config/db.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Db connection
connectDB();


//set EJS
app.set('view engine', 'ejs');
app.set('views', './src/views');


//Routes
app.use('/', mainRouter);







//Start server
app.listen(PORT, () => {
      console.log(`🚀 Tronava Shop server is running on http://localhost:${PORT}`);

})