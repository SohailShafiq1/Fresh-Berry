import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import adminAuthRouter from "./routes/adminAuth.js";
import quoteRouter from "./routes/quote.js";
import productRouter from "./routes/product.js";
import path from "path";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://freshberryuae.com","https://freshberryproject.netlify.app","https://api.freshberryuae.com"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("🚀 FreshBerry Backend is Live!");
});

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    createDefaultAdmin();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api", adminAuthRouter);
app.use("/api/quotes", quoteRouter);
app.use("/api/products", productRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT;

// Insert predefined admin credentials if not present
async function createDefaultAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
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
    console.log("Default admin user created.");
  } else {
    console.log("Default admin user already exists.");
  }
}

mongoose.connection.once("open", () => {
  createDefaultAdmin();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

export default app;