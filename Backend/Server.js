import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import bcrypt from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

// Route and Model imports
import adminAuthRouter from "./routes/adminAuth.js";
import quoteRouter from "./routes/quote.js";
import productRouter from "./routes/product.js";
import User from "./models/User.js";

// --- Configuration & Initialization ---
dotenv.config();

// ES Module fix for __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080; // Use a fallback port

// --- Middleware Setup ---
app.use(
  cors({
    origin: ["http://localhost:5173", "https://freshberryuae.com", "https://freshberryproject.netlify.app", "https://api.freshberryuae.com"],
    credentials: true,
  })
);

app.use(morgan("dev")); // HTTP request logger

// Replaces the deprecated `body-parser`
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- API Routes ---
app.use("/api", adminAuthRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/products", productRouter);

// --- Serve Frontend Application ---
// Serves static files from the 'dist' folder (e.g., React/Vue build output)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to serve index.html for any other requests (for SPAs)
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });


// --- Helper Function for Admin Creation ---
const createDefaultAdmin = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.warn("⚠️ Admin credentials not found in .env file. Skipping admin creation.");
      return;
    }

    const existingAdmin = await User.findOne({ email: adminEmail, role: "admin" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default admin user created.");
    } else {
      console.log("ℹ️ Default admin user already exists.");
    }
  } catch (error) {
    console.error("❌ Error during default admin creation:", error);
  }
};

// --- Main Server Startup Function ---
const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 2. Create the default admin user if needed
    await createDefaultAdmin();

    // 3. Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Exit the process with an error code
  }
};

// Start the server
startServer();

export default app;