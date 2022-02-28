import express from "express";
import cors from "cors";
import db from "./db/db.js";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes.js";
//import userRoutes from "./routes/userRoutes.js";
//import bookRoutes from "./routes/bookRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/contact", contactRoutes);
//app.use("/api/user", userRoutes);
//app.use("/api/book", bookRoutes);

app.listen(process.env.PORT, () => console.log("Backend Server running on Port:", process.env.PORT));

db.dbConnection();