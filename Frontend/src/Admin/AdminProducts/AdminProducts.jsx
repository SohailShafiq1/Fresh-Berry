import { TbCurrencyDirham } from "react-icons/tb";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
import styles from "./AdminProducts.module.css";

const s = styles;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    origin: "",
  });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    origin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);
  const [marking, setMarking] = useState("");
  const [deleting, setDeleting] = useState("");
  const [csvUploading, setCsvUploading] = useState(false);
  const [csvResults, setCsvResults] = useState(null);
  const [folderUploading, setFolderUploading] = useState(false);
  const [folderResults, setFolderResults] = useState(null);
  const [removingAll, setRemovingAll] = useState(false);
  const fileInputRef = useRef(null);
  const csvInputRef = useRef(null);
  const folderInputRef = useRef(null);

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
      setError("");
    } catch (err) {
      setError("Failed to fetch products");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    

    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("origin", form.origin);
      
      if (form.image) {
        formData.append("image", form.image);
      } else {
        // If no image provided, check if default logo exists and use it
        const existingProductWithLogo = products.find(p => 
          p.image && (
            p.image.includes('fresh-berry-logo') || 
            p.image.includes('fresh-berry-default-logo') ||
            p.image.includes('default-logo') ||
            p.image.includes('logo.jpg')
          )
        );
        
        if (existingProductWithLogo) {
          formData.append("imageUrl", `${API_URL}${existingProductWithLogo.image}`);
        }
      }

      
      const response = await axios.post(`${API_URL}/api/products/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) => [...prev, response.data]);
      setForm({ name: "", image: "", description: "", price: "", origin: "" });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("❌ Failed to add product:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      alert(`Failed to add product: ${err.response?.data?.error || err.message}`);
    }
    setAdding(false);
  };

  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await axios.delete(`${API_URL}/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete product");
    }
    setDeleting("");
  };

  const handleEditClick = (product) => {
    setEditId(product._id);
    setEditForm({
      name: product.name,
      description: product.description,
      price: product.price,
      origin: product.origin,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditForm({ ...editForm, image: file });
    }
  };

  const handleEditSave = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", editForm.name);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);
      formData.append("origin", editForm.origin);
      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      const response = await axios.put(
        `${API_URL}/api/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? response.data : p))
      );
      setEditId(null);
      setEditForm({ name: "", description: "", price: "", origin: "" });
    } catch (err) {
      alert("Failed to update product");
    }
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditForm({ name: "", description: "", price: "", origin: "" });
  };

  const handleMarkHot = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/products/${id}/hotselling`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, hotselling: true } : p))
      );
    } catch (err) {
      alert("Failed to mark as hotselling");
    }
    setMarking("");
  };

  const handleUnmarkHot = async (id) => {
    setMarking(id);
    try {
      await axios.patch(`${API_URL}/api/products/${id}/unmark-hotselling`);
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, hotselling: false } : p))
      );
    } catch (err) {
      alert("Failed to unmark as hotselling");
    }
    setMarking("");
  };

  // CSV Upload functionality
  const handleCsvUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setCsvUploading(true);
    setCsvResults(null);

    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        alert("CSV file is empty");
        setCsvUploading(false);
        return;
      }

      // Parse CSV headers
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      const requiredHeaders = ['name', 'description', 'price'];
      const optionalHeaders = ['origin', 'image', 'imageurl', 'image_url'];
      
      // Check if required headers exist
      const missingHeaders = requiredHeaders.filter(header => 
        !headers.includes(header)
      );
      
      if (missingHeaders.length > 0) {
        alert(`Missing required headers: ${missingHeaders.join(', ')}\nRequired headers: name, description, price\nOptional: origin, image or imageurl`);
        setCsvUploading(false);
        return;
      }

      const results = {
        added: 0,
        updated: 0,
        errors: []
      };

      // Check if default logo already exists, upload once if needed
      let defaultLogoPath = null;
      const getOrUploadDefaultLogo = async () => {
        if (defaultLogoPath) return defaultLogoPath; // Return if already determined
        
        // First check if any product already has the default logo
        const existingProductWithLogo = products.find(p => 
          p.image && (
            p.image.includes('fresh-berry-logo') || 
            p.image.includes('default-logo') ||
            p.image.includes('logo.jpg')
          )
        );
        
        if (existingProductWithLogo) {
          defaultLogoPath = existingProductWithLogo.image;
          return defaultLogoPath;
        }
        
        // If no existing logo found, upload it once
        try {
          const defaultImageBlob = await fetch('/logo.jpg').then(r => r.blob());
          const logoFormData = new FormData();
          logoFormData.append("name", "Default Fresh Berry Logo");
          logoFormData.append("description", "Default logo for Fresh Berry products");
          logoFormData.append("price", "0");
          logoFormData.append("origin", "Fresh Berry");
          logoFormData.append("image", defaultImageBlob, 'fresh-berry-default-logo.jpg');

          const logoResponse = await axios.post(`${API_URL}/api/products/add`, logoFormData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          defaultLogoPath = logoResponse.data.image;
          
          // Remove the temporary logo product (we only needed it to upload the image)
          await axios.delete(`${API_URL}/api/products/${logoResponse.data._id}`);
          
          return defaultLogoPath;
        } catch (error) {
          console.warn("Could not upload default logo:", error);
          return null;
        }
      };

      // Process each row
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        
        if (values.length !== headers.length) {
          results.errors.push(`Row ${i + 1}: Column count mismatch`);
          continue;
        }

        const rowData = {};
        headers.forEach((header, index) => {
          rowData[header] = values[index];
        });

        // Validate required fields
        if (!rowData.name || !rowData.description || !rowData.price) {
          results.errors.push(`Row ${i + 1}: Missing required fields (name, description, price)`);
          continue;
        }

        try {
          // Check if product exists (by name)
          const existingProduct = products.find(p => 
            p.name.toLowerCase() === rowData.name.toLowerCase()
          );

          // Determine image handling
          const imageUrl = rowData.image || rowData.imageurl || rowData.image_url;
          const hasImageUrl = imageUrl && imageUrl.trim() && imageUrl !== '';

          if (existingProduct) {
            // Update existing product
            const formData = new FormData();
            formData.append("name", rowData.name);
            formData.append("description", rowData.description);
            formData.append("price", rowData.price);
            formData.append("origin", rowData.origin || ""); // Allow empty origin
            
            // Handle image update logic
            if (hasImageUrl) {
              // Always update image if CSV provides an image URL
              formData.append("imageUrl", imageUrl.trim());
            } else {
              // If no image URL in CSV, check if product has default logo and needs updating
              const hasDefaultLogo = existingProduct.image && 
                (existingProduct.image.includes('logo.jpg') || 
                 existingProduct.image.includes('logo.png') || 
                 existingProduct.image.includes('default-logo'));
              
              if (hasDefaultLogo) {
              }
              // Don't add imageUrl field if no URL provided - keeps existing image
            }

            const response = await axios.put(
              `${API_URL}/api/products/${existingProduct._id}`,
              formData,
              { headers: { "Content-Type": "multipart/form-data" } }
            );

            setProducts((prev) =>
              prev.map((p) => (p._id === existingProduct._id ? response.data : p))
            );
            results.updated++;
          } else {
            // Add new product
            const formData = new FormData();
            formData.append("name", rowData.name);
            formData.append("description", rowData.description);
            formData.append("price", rowData.price);
            formData.append("origin", rowData.origin || ""); // Allow empty origin
            
            if (hasImageUrl) {
              // Use provided image URL
              formData.append("imageUrl", imageUrl.trim());
            } else {
              // Use shared default logo path
              const logoPath = await getOrUploadDefaultLogo();
              if (logoPath) {
                formData.append("imageUrl", `${API_URL}${logoPath}`);
              } else {
                console.warn("Could not get default logo, proceeding without image");
              }
            }

            const response = await axios.post(`${API_URL}/api/products/add`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });

            setProducts((prev) => [...prev, response.data]);
            results.added++;
          }
        } catch (err) {
          results.errors.push(`Row ${i + 1}: ${err.response?.data?.error || err.message}`);
        }
      }

      setCsvResults(results);
      
      // Show summary
      let message = `CSV Upload Complete!\n`;
      message += `• Added: ${results.added} products\n`;
      message += `• Updated: ${results.updated} products\n`;
      if (results.errors.length > 0) {
        message += `• Errors: ${results.errors.length}\n\nErrors:\n${results.errors.join('\n')}`;
      }
      alert(message);

    } catch (err) {
      console.error("CSV upload error:", err);
      alert(`Failed to process CSV file: ${err.message}`);
    }

    setCsvUploading(false);
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
    }
  };

  // Folder Upload functionality
  const handleFolderUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files || files.length === 0) return;

    setFolderUploading(true);
    setFolderResults(null);


    const results = {
      added: 0,
      updated: 0,
      skipped: 0,
      errors: []
    };

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Only process image files
        if (!file.type.startsWith('image/')) {
          results.skipped++;
          console.log(`⏭️ Skipping "${file.name}" - not an image file`);
          continue;
        }

        try {
          // Extract product name from filename (remove extension and format nicely)
          const fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
          let productName = fileName
            .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
            .replace(/[^a-zA-Z0-9\s]/g, " ") // Replace other special characters with spaces
            .replace(/\s+/g, " ") // Replace multiple spaces with single space
            .trim(); // Remove leading/trailing spaces
          
          // Capitalize first letter of each word for better formatting
          productName = productName
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
          
          // If productName is empty or only spaces, use original filename
          if (!productName || productName.trim() === "") {
            productName = fileName || `Product ${i + 1}`;
          }
          
          // Check if product with this name already exists
          const existingProduct = products.find(p => 
            p.name.toLowerCase() === productName.toLowerCase()
          );

          if (existingProduct) {
            // Update existing product with new image
            try {
              const formData = new FormData();
              formData.append("name", existingProduct.name); // Keep original name
              formData.append("description", existingProduct.description); // Keep original description
              formData.append("price", existingProduct.price); // Keep original price
              formData.append("origin", existingProduct.origin || ""); // Keep original origin
              formData.append("image", file); // Replace with new image

              console.log(`🔄 Updating existing product "${productName}" with new image`);

              const response = await axios.put(
                `${API_URL}/api/products/${existingProduct._id}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );

              setProducts((prev) =>
                prev.map((p) => (p._id === existingProduct._id ? response.data : p))
              );
              results.updated = (results.updated || 0) + 1;
              continue;
            } catch (err) {
              const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message;
              results.errors.push(`${file.name} (update): ${errorMessage}`);
              console.error(`❌ Failed to update product for ${file.name}:`, {
                error: errorMessage,
                status: err.response?.status,
                data: err.response?.data
              });
              continue;
            }
          }

          // Generate random price under 100
          const randomPrice = (Math.random() * 99 + 1).toFixed(2);

          // Create FormData for new product
          const formData = new FormData();
          formData.append("name", productName);
          formData.append("description", `Fresh and organic ${productName.toLowerCase()}`);
          formData.append("price", randomPrice);
          formData.append("origin", ""); // Empty origin as requested
          formData.append("image", file);


          const response = await axios.post(`${API_URL}/api/products/add`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          setProducts((prev) => [...prev, response.data]);
          results.added++;

        } catch (err) {
          const errorMessage = err.response?.data?.error || err.response?.data?.details || err.message;
          results.errors.push(`${file.name}: ${errorMessage}`);
          console.error(`❌ Failed to add product for ${file.name}:`, {
            error: errorMessage,
            status: err.response?.status,
            data: err.response?.data
          });
        }
      }

      setFolderResults(results);
      
      // Show summary
      let message = `Folder Upload Complete!\n`;
      message += `• Added: ${results.added} new products\n`;
      message += `• Updated: ${results.updated || 0} existing products (images replaced)\n`;
      message += `• Skipped: ${results.skipped} non-image files\n`;
      if (results.errors.length > 0) {
        message += `• Errors: ${results.errors.length}\n\nErrors:\n${results.errors.slice(0, 5).join('\n')}`;
        if (results.errors.length > 5) {
          message += `\n... and ${results.errors.length - 5} more errors`;
        }
      }
      alert(message);

    } catch (err) {
      console.error("Folder upload error:", err);
      alert(`Failed to process folder: ${err.message}`);
    }

    setFolderUploading(false);
    if (folderInputRef.current) {
      folderInputRef.current.value = "";
    }
  };

  const downloadSampleCsv = () => {
    const sampleData = `name,description,price,origin,imageUrl
Fresh Apples,Crispy red apples from local farms,5.99,Local Farm,https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6
Organic Bananas,Sweet organic bananas,3.49,Ecuador,
Premium Oranges,Juicy Valencia oranges,4.99,,https://images.unsplash.com/photo-1547036967-23d11aacaee0
Local Berries,Fresh mixed berries,7.99,Local Farm,
Tomatoes,Fresh red tomatoes,6.49,,https://images.unsplash.com/photo-1592924357228-91a4daadcfea`;

    const blob = new Blob([sampleData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-products.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const downloadAllProductsCsv = () => {
    if (products.length === 0) {
      alert('No products available to download');
      return;
    }

    // Create CSV headers
    const headers = ['name', 'description', 'price', 'origin', ];
    
    // Convert products to CSV format
    const csvData = products.map(product => {
      const imageUrl = product.image 
        ? (product.image.startsWith('/uploads/') 
            ? `${API_URL}${product.image}` 
            : product.image)
        : '';
      
      return [
        `"${(product.name || '').replace(/"/g, '""')}"`,
        `"${(product.description || '').replace(/"/g, '""')}"`,
        product.price || '',
        `"${(product.origin || '').replace(/"/g, '""')}"`,
       
      ].join(',');
    });

    // Combine headers and data
    const csvContent = [headers.join(','), ...csvData].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fresh-berry-products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Remove All Products functionality
  const handleRemoveAllProducts = async () => {
    const confirmMessage = `⚠️ WARNING: This will permanently delete ALL ${products.length} products!\n\nThis action cannot be undone. Are you absolutely sure you want to continue?`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    // Double confirmation
    const doubleConfirm = window.confirm("🚨 FINAL CONFIRMATION: Delete ALL products permanently?");
    if (!doubleConfirm) {
      return;
    }

    setRemovingAll(true);

    try {
      let successCount = 0;
      let errorCount = 0;
      const errors = [];

      console.log(`🗑️ Starting bulk deletion of ${products.length} products...`);

      // Delete products one by one to handle individual errors
      for (const product of products) {
        try {
          await axios.delete(`${API_URL}/api/products/${product._id}`);
          successCount++;
          console.log(`✅ Deleted: ${product.name}`);
        } catch (err) {
          errorCount++;
          errors.push(`${product.name}: ${err.response?.data?.error || err.message}`);
          console.error(`❌ Failed to delete ${product.name}:`, err);
        }
      }

      // Update local state to remove all products
      setProducts([]);

      // Show results
      let message = `Bulk Deletion Complete!\n`;
      message += `• Successfully deleted: ${successCount} products\n`;
      if (errorCount > 0) {
        message += `• Failed to delete: ${errorCount} products\n\nErrors:\n${errors.slice(0, 3).join('\n')}`;
        if (errors.length > 3) {
          message += `\n... and ${errors.length - 3} more errors`;
        }
      }
      
      alert(message);

      // Refresh products list to ensure sync with backend
      await fetchProducts();

    } catch (err) {
      console.error("Bulk deletion error:", err);
      alert(`Failed to delete all products: ${err.message}`);
    }

    setRemovingAll(false);
  };

  return (
    <div className={s.container}>
      <h2 className={s.title}>Admin Products</h2>
      
      {/* CSV Upload Section */}
      <div className={s.csvSection}>
        <h3 className={s.csvTitle}>📁 Bulk Upload Products</h3>
        <div className={s.csvActions}>
          <input
            type="file"
            accept=".csv"
            onChange={handleCsvUpload}
            ref={csvInputRef}
            className={s.csvInput}
            disabled={csvUploading}
          />
          <button
            className={s.button}
            onClick={downloadSampleCsv}
            type="button"
            style={{ background: "#059669" }}
          >
            📥 Download Sample CSV
          </button>
          <button
            className={s.button}
            onClick={downloadAllProductsCsv}
            type="button"
            style={{ background: "#1976d2" }}
            disabled={products.length === 0}
          >
            📊 Download All Products CSV
          </button>
          <button
            className={s.button}
            onClick={handleRemoveAllProducts}
            type="button"
            style={{ background: "#dc3545", color: "#fff" }}
            disabled={products.length === 0 || removingAll}
          >
            {removingAll ? "🗑️ Removing All..." : "🗑️ Remove All Products"}
          </button>
          <div className={s.csvInfo}>
            <small>
              Upload a CSV file with columns: <strong>name, description, price</strong>
              <br />
              Optional: <strong>origin, imageUrl</strong> - Provide image links to replace default logos or update existing images
              <br />
              • Existing products will be updated with new data and images (if provided)
              <br />
              • New products get Fresh Berry logo by default (unless imageUrl provided)
              <br />
              • Origin is optional and can be left empty
              <br />
              • Download all products to get current database in CSV format
              <br />
              • <strong>⚠️ Remove All Products will permanently delete everything</strong>
            </small>
          </div>
        </div>
        {csvUploading && (
          <div className={s.csvStatus}>
            🔄 Processing CSV file, please wait...
          </div>
        )}
      </div>

      {/* Folder Upload Section */}
      <div className={s.csvSection}>
        <h3 className={s.csvTitle}>🖼️ Bulk Upload Images (Folder)</h3>
        <div className={s.csvActions}>
          <input
            type="file"
            accept="image/*"
            multiple
            webkitdirectory="true"
            directory="true"
            onChange={handleFolderUpload}
            ref={folderInputRef}
            className={s.csvInput}
            disabled={folderUploading}
          />
          <div className={s.csvInfo}>
            <small>
              <strong>📁 Upload a folder of images to auto-create/update products:</strong>
              <br />
              • Product name will be the image filename (without extension)
              <br />
              • Description will be "Fresh and organic [product name]"
              <br />
              • Price will be randomly generated under $100 (for new products only)
              <br />
              • Origin will be empty (optional field)
              <br />
              • <strong>Existing products with same names will have their images replaced</strong>
              <br />
              • Only image files will be processed, others skipped
              <br />
              • Special characters in filenames will be cleaned and formatted
            </small>
          </div>
        </div>
        {folderUploading && (
          <div className={s.csvStatus}>
            🔄 Processing folder images, please wait...
          </div>
        )}
      </div>

      {/* Add Product Form */}
      <form className={s.form} onSubmit={handleAdd}>
        <input
          id="product-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            style={{ flex: 1 }}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            Single image for this product
          </small>
        </div>
        <input
          id="product-description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          id="product-price"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          required
        />
        <input
          id="product-origin"
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="Origin (optional)"
        />
        <button className={s.button} type="submit" disabled={adding}>
          {adding ? "Adding..." : "Add Product"}
        </button>
      </form>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className={s.grid}>
          {products.map((p) => (
            <div key={p._id} className={s.card}>
              <div className={s.imageWrap}>
                {p.image ? (
                  p.image.startsWith("/uploads/") ? (
                    <img
                      src={`${API_URL}${p.image}`}
                      alt={p.name}
                      className={s.image}
                    />
                  ) : (
                    <img src={p.image} alt={p.name} className={s.image} />
                  )
                ) : null}
              </div>
              <div className={s.info}>
                <div className={s.name}>{p.name}</div>
                <div className={s.desc}>{p.description}</div>
                <div className={s.price}>{p.price}</div>
                <div className={s.origin}>Origin: {p.origin}</div>
                <div
                  className={s.hot}
                  style={{ color: p.hotselling ? "#20b958" : "#e53935" }}
                >
                  {p.hotselling ? "Hot Selling" : "Not Hot"}
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  {p.hotselling ? (
                    <button
                      className={s.button}
                      disabled={marking === p._id}
                      onClick={() => handleUnmarkHot(p._id)}
                    >
                      {marking === p._id
                        ? "Unmarking..."
                        : "Unmark Hot Selling"}
                    </button>
                  ) : (
                    <button
                      className={s.button}
                      disabled={marking === p._id}
                      onClick={() => handleMarkHot(p._id)}
                    >
                      {marking === p._id ? "Marking..." : "Mark as Hot Selling"}
                    </button>
                  )}
                  <button
                    className={s.button}
                    style={{ background: "#e53935", color: "#fff" }}
                    disabled={deleting === p._id}
                    onClick={() => handleDelete(p._id)}
                  >
                    {deleting === p._id ? "Deleting..." : "Delete"}
                  </button>
                  <button
                    className={s.button}
                    style={{ background: "#1976d2", color: "#fff" }}
                    onClick={() => handleEditClick(p)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Popup Modal */}
      {editId && (
        <div className={s.modalOverlay} onClick={handleEditCancel}>
          <div className={s.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={s.modalTitle}>Edit Product</h3>
            <input
              id="edit-product-name"
              name="name"
              value={editForm.name}
              onChange={handleEditChange}
              placeholder="Name"
              className={s.input}
            />
            <input
              id="edit-product-image"
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
              className={s.input}
            />
            <input
              id="edit-product-description"
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              placeholder="Description"
              className={s.input}
            />
            <input
              id="edit-product-price"
              name="price"
              value={editForm.price}
              onChange={handleEditChange}
              placeholder="Price"
              type="number"
              className={s.input}
            />
            <input
              id="edit-product-origin"
              name="origin"
              value={editForm.origin}
              onChange={handleEditChange}
              placeholder="Origin"
              className={s.input}
            />
            <div className={s.modalActions}>
              <button
                className={s.button}
                onClick={() => handleEditSave(editId)}
              >
                Save
              </button>
              <button
                className={s.button}
                onClick={handleEditCancel}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
