import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser())

app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
