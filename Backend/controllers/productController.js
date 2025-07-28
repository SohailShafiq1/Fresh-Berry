// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete product" });
  }
};

// Edit/update a product by ID
export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
};
import Product from "../models/Product.js";
import path from "path";

export const getProducts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.hotselling === "true") {
      filter.hotselling = true;
    }
    let query = Product.find(filter);
    if (req.query.limit) {
      const limit = parseInt(req.query.limit, 10);
      if (!isNaN(limit)) query = query.limit(limit);
    }
    const products = await query;
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const addProduct = async (req, res) => {
  console.log("🔧 addProduct endpoint hit");
  console.log("📝 Request body:", req.body);
  console.log("📷 Request file:", req.file);
  
  try {
    const { name, description, price } = req.body;
    
    console.log("📋 Extracted data:", { name, description, price });
    
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      console.log("📷 Image path:", imagePath);
    }
    
    const product = new Product({
      name,
      image: imagePath,
      description,
      price,
    });
    
    console.log("💾 Product to save:", product);
    
    await product.save();
    console.log("✅ Product saved successfully:", product);
    
    res.status(201).json(product);
  } catch (err) {
    console.error("❌ Add Product Error:", err);
    res
      .status(400)
      .json({ error: "Failed to add product", details: err.message });
  }
};

export const markHotSelling = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { hotselling: true },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
};

export const unmarkHotSelling = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(
      id,
      { hotselling: false },
      { new: true }
    );
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
};
