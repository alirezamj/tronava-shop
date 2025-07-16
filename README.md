# 🛍️ Tronava Shop

Welcome to **Tronava Shop**, a full-featured online store built with Node.js and Express. This real-world project demonstrates modern backend development practices—including secure authentication, a scalable API, and dynamic rendering with EJS.

## 🚀 Features

- RESTful API using **Express.js**
- **MongoDB** for data storage, accessed via **Mongoose**
- Dynamic front-end templating with **EJS**
- Authentication and authorization using **cookie-based sessions**
- Role-based access: Admin vs Customer
- Product management (CRUD operations)
- Shopping cart and order system
- Robust error handling and input validation
- Clean MVC architecture
- Environment variable management with **dotenv**

## 🔧 Technologies Used

| Stack        | Tool/Library    |
|--------------|-----------------|
| Backend      | Node.js, Express.js |
| Database     | MongoDB, Mongoose |
| Frontend     | HTML, EJS Templates |
| Auth & State | Express-session, bcrypt |
| Dev Tools    | nodemon, dotenv |
| Deployment   | GitHub, [Render/Railway/Vercel] |

## 📁 Folder Structure
tronava-shop/ ├── src/ │   ├── routes/         # Route definitions │   ├── controllers/    # Route logic │   ├── models/         # Mongoose schemas │   ├── views/          # EJS templates │   ├── config/         # DB connection, env setup │   └── app.js          # Entry point ├── .env ├── .gitignore ├── README.md


## ⚙️ Setup Instructions

```bash
git clone https://github.com/YourUsername/tronava-shop.git
cd tronava-shop
npm install
npm run start

PORT=3000
MONGO_URI=mongodb://localhost:27017/tronava_shop
SESSION_SECRET=your_secret_here

🙌 Author
Made with love by Alireza 💻🧠
You can reach me at [alirezaj5zo23@gmail.com]
