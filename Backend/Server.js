import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import bcrypt from "bcryptjs";

import adminAuthRouter from "./routes/adminAuth.js";
import quoteRouter from "./routes/quote.js";
import productRouter from "./routes/product.js";
import User from "./models/User.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://freshberryuae.com",
      "https://mainfreshberry.netlify.app",
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// ✅ Static file serving
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// ✅ API Routes
app.use("/api", adminAuthRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/products", productRouter);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 FreshBerry Backend is Live!");
});

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    createDefaultAdmin();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on https://api.freshberryuae.com:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

// ✅ Create default admin if not exists
async function createDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  try {
    const existingAdmin = await User.findOne({
      email: adminEmail,
      role: "admin",
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default admin user created.");
    } else {
      console.log("ℹ️ Default admin already exists.");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  }
}
