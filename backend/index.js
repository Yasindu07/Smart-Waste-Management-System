import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.route.js";
import scheduleRoutes from "./routes/schedule.route.js";
import truckRoutes from "./routes/truck.route.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Allow cookies to be sent
}))
app.use(cookieParser());

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 
app.use('/api/auth',authRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/truck',truckRoutes);
app.use('/api/user',userRoutes);


app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })
})