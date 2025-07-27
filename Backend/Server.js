// server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import adminAuthRouter from "./routes/adminAuth.js";
import quoteRouter from "./routes/quote.js";
import productRouter from "./routes/product.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 443;

// CORS for frontend + Netlify
app.use(
  cors({
    origin: ["http://localhost:5173", "https://freshberryuae.com", "https://mainfreshberry.netlify.app"],
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Serve static images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API Routes
app.use("/api", adminAuthRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/products", productRouter);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 FreshBerry Backend is Live!");
});

// Admin Seeder Logic
async function createDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    await User.create({ email: adminEmail, password: hashedPassword, role: "admin" });
    console.log("✅ Default admin user created.");
  } else {
    console.log("✅ Default admin user already exists.");
  }
}

// MongoDB Connection and HTTPS Server Start
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    await createDefaultAdmin();

    const privateKey = fs.readFileSync("/etc/letsencrypt/live/api.freshberryuae.com/privkey.pem", "utf8");
    const certificate = fs.readFileSync("/etc/letsencrypt/live/api.freshberryuae.com/fullchain.pem", "utf8");
    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(PORT, () => {
      console.log(`🚀 HTTPS Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

export default app;
