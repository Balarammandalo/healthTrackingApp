const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${process.env.MONGO_URL}`);
      
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;









// health-app-backend/
// │
// ├── server.js
// ├── package.json
// ├── .env
// │
// ├── config/
// │   └── db.js
// │
// ├── controllers/
// │   ├── authController.js
// │   ├── userController.js
// │   ├── goalController.js
// │   └── activityController.js
// │
// ├── models/
// │   ├── User.js
// │   ├── Goal.js
// │   └── Activity.js
// │
// ├── routes/
// │   ├── authRoutes.js
// │   ├── userRoutes.js
// │   ├── goalRoutes.js
// │   └── activityRoutes.js
// │
// ├── middleware/
// │   ├── authMiddleware.js
// │   └── errorMiddleware.js
// │
// └── utils/
//     └── calculateBMI.js