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
    const { imageUrl } = req.body;
    const updateData = { ...req.body };
    
    console.log(`🔧 Updating product ${id} with data:`, updateData);
    
    // Handle image: priority for file upload > image URL > keep existing
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
      console.log("📷 Updating with uploaded file:", updateData.image);
    } else if (imageUrl && imageUrl.trim()) {
      // Validate if it's a proper URL
      try {
        new URL(imageUrl);
        updateData.image = imageUrl.trim();
        console.log("🔗 Updating with image URL:", updateData.image);
        
        // Get current product to check if it had default logo
        const currentProduct = await Product.findById(id);
        if (currentProduct && currentProduct.image) {
          const hadDefaultLogo = currentProduct.image.includes('logo.jpg') || 
                                 currentProduct.image.includes('logo.png') || 
                                 currentProduct.image.includes('default-logo');
          if (hadDefaultLogo) {
            console.log("🔄 Replacing default logo with new image URL");
          } else {
            console.log("🔄 Replacing existing custom image with new URL");
          }
        }
      } catch (urlError) {
        console.warn("⚠️ Invalid image URL provided, keeping existing image");
        delete updateData.imageUrl; // Remove invalid URL from update data
      }
    } else {
      // No new image provided, keep existing
      console.log("ℹ️ No new image provided, keeping existing image");
    }
    
    // Remove imageUrl from updateData as it's not a field in the schema
    delete updateData.imageUrl;
    
    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    
    console.log("✅ Product updated successfully:", product);
    res.json(product);
  } catch (err) {
    console.error("❌ Edit Product Error:", err);
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
    const { name, description, price, origin, imageUrl } = req.body;
    
    console.log("📋 Extracted data:", { name, description, price, origin, imageUrl });
    
    let imagePath = "";
    
    // Priority: file upload > image URL > empty
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
      console.log("📷 Using uploaded file:", imagePath);
    } else if (imageUrl && imageUrl.trim()) {
      // Validate if it's a proper URL
      try {
        new URL(imageUrl);
        imagePath = imageUrl.trim();
        console.log("🔗 Using image URL:", imagePath);
      } catch (urlError) {
        console.warn("⚠️ Invalid image URL provided:", imageUrl);
        imagePath = ""; // Keep empty if invalid URL
      }
    }
    
    const product = new Product({
      name,
      image: imagePath,
      description,
      price,
      origin,
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
