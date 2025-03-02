import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import ticketRoutes from "./routes/ticket.routes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors())

app.use("/api/auth", authRoutes);
app.use("/api", ticketRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
