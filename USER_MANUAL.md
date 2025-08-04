# 👥 Fresh Berry - User Manual

## 🎯 Introduction

Welcome to Fresh Berry, your complete e-commerce platform for fresh produce and specialty foods. This user manual will guide you through all features and functionalities of both the customer-facing website and the administrative panel.

## 🌐 Customer Website Guide

### 🏠 Homepage Overview

When customers visit your website, they'll see:

1. **Navigation Bar**
   - Company logo (links to homepage)
   - Search bar for real-time product search
   - Menu items: Home, Products, HoReCa Supply, Request a Quote, About Us, Contact Us
   - Theme toggle (light/dark mode)
   - Contact button

2. **Hero Section**
   - Eye-catching banner showcasing your brand
   - Welcome message and company introduction

3. **Featured Products**
   - Display of hot-selling items
   - Direct links to product details

4. **Services Section**
   - Overview of your business offerings
   - Information about HoReCa (Hotel, Restaurant, Cafe) services

### 🔍 Product Search & Browsing

#### Real-time Search
- Customers can search for products using the search bar in the navigation
- Results appear instantly as they type
- Search works across product names, descriptions, and origins
- Example searches: "apple", "organic", "Dubai", "fresh"

#### Product Catalog Page
1. **Accessing Products**
   - Click "Products" in the navigation menu
   - Search results automatically redirect to the products page

2. **Filtering Options**
   - **Filter Button**: Opens filtering options
   - **Name Search**: Filter by product name
   - **Price Range**: Set minimum and maximum price limits
   - **Clear Filters**: Remove all applied filters

3. **Sorting Options**
   - **Sort Button**: Opens sorting menu
   - **Price**: Low to High or High to Low
   - **Name**: A-Z or Z-A
   - **Default**: Original order

4. **Product Cards Display**
   - Product image (with fallback for missing images)
   - Product name and description
   - Price information
   - Origin/source country
   - "Order Now" button (links to WhatsApp)

### 📱 Mobile Experience

#### Responsive Design
- Automatically adapts to mobile devices
- Touch-friendly interface
- Hamburger menu for easy navigation
- Optimized search and filtering

#### Mobile Navigation
- Tap the menu icon (☰) to open navigation
- All menu items accessible in mobile view
- Search bar prominent at the top
- Easy access to contact information

### 💬 Quote Request System

#### For Bulk Orders
1. **Access Quote Form**
   - Navigate to "Request a Quote" from the menu
   - Fill out the required information:
     - Full Name
     - Email Address
     - Phone Number
     - Detailed Message (specify products and quantities)

2. **Submit Request**
   - Click "Submit Quote" button
   - Confirmation message appears
   - Admin receives the quote in the dashboard

### 🏢 HoReCa Services

#### Business-to-Business Features
- Specialized page for hotels, restaurants, and cafes
- Information about bulk ordering
- Custom solutions for business clients
- Direct contact information for B2B inquiries

## 🔧 Admin Panel Guide

### 🔐 Admin Login

1. **Accessing Admin Panel**
   - Go to `/admin/login` (usually hidden from main navigation)
   - Enter admin username and password
   - Click "Login" to access the dashboard

2. **Dashboard Overview**
   - **Statistics**: Total products, pending quotes
   - **Quick Actions**: Direct links to management sections
   - **Recent Activity**: Latest quotes and system updates

### 📦 Product Management

#### Adding New Products

1. **Single Product Addition**
   - Navigate to "Admin Products" section
   - Fill out the product form:
     - **Name**: Product name (required)
     - **Image**: Upload product photo (optional)
     - **Description**: Product details (required)
     - **Price**: Product price in AED (required)
     - **Origin**: Source country/region (required)
   - Click "Add Product" to save

2. **Image Handling**
   - Supported formats: JPG, PNG, GIF
   - If no image uploaded, default Fresh Berry logo is used
   - Images automatically optimized for web display

#### Bulk Product Management

1. **CSV Upload System**
   - **Download Sample CSV**: Get a template file with correct format
   - **Prepare Your CSV**: Include columns: name, description, price, origin
   - **Optional Image Column**: Add imageUrl column for external image links
   - **Upload File**: Select your CSV file and upload

2. **CSV Format Requirements**
   ```csv
   name,description,price,origin,imageUrl
   Fresh Apples,Crispy red apples,5.99,Local Farm,https://example.com/apple.jpg
   Organic Bananas,Sweet organic bananas,3.49,Ecuador,
   ```

3. **Upload Results**
   - System shows summary: products added, updated, errors
   - Existing products are updated if names match
   - New products get default logo if no image URL provided

#### Product Management Actions

1. **Edit Products**
   - Click "Edit" button on any product card
   - Modify product information in the popup
   - Update images if needed
   - Click "Save" to apply changes

2. **Delete Products**
   - Click "Delete" button (red button)
   - Confirm deletion when prompted
   - Product is permanently removed

3. **Hot-Selling Status**
   - **Mark as Hot Selling**: Highlights popular products
   - **Unmark Hot Selling**: Removes special designation
   - Hot-selling products appear in featured sections

4. **Export Products**
   - **Download All Products CSV**: Export complete database
   - File includes all product information and image URLs
   - Use for backup, analysis, or migration

### 💼 Quote Management

#### Viewing Customer Quotes

1. **Access Quotes**
   - Navigate to "Admin Quotes" section
   - View all customer quote requests

2. **Quote Information**
   - Customer name and contact details
   - Email and phone number
   - Detailed message with requirements
   - Submission date and time

3. **Managing Quotes**
   - Contact customers directly using provided information
   - Mark quotes as processed (if feature available)
   - Export quote data for external processing

### 📊 Data Export Features

#### Product Database Export
1. **Complete Export**
   - Click "Download All Products CSV"
   - File includes: name, description, price, origin, image URLs, hot-selling status
   - Filename includes current date for organization

2. **Use Cases**
   - **Backup**: Regular database backups
   - **Analysis**: Import into Excel for business analysis
   - **Migration**: Move data to other systems
   - **Reporting**: Generate custom reports

#### Sample Data Templates
1. **Download Sample CSV**
   - Get properly formatted template
   - Example data showing correct format
   - Use as starting point for bulk uploads

### 🎨 Theme and Display Settings

#### Website Appearance
- Customers can toggle between light and dark themes
- Theme preference is saved in browser
- Admin panel automatically adapts to system theme
- All components are theme-responsive

## 📱 Mobile Administration

### Admin Mobile Access
- Admin panel is fully responsive
- Touch-friendly buttons and forms
- Mobile-optimized file uploads
- Easy navigation on smartphones and tablets

### Mobile Product Management
- Add products using mobile camera
- Upload photos directly from phone gallery
- Edit products with touch-friendly interface
- View and manage quotes on mobile

## 🔒 Security & Best Practices

### Admin Account Security
1. **Strong Passwords**
   - Use complex passwords with mixed characters
   - Change passwords regularly
   - Don't share admin credentials

2. **Safe Browsing**
   - Log out when finished
   - Clear browser cache on shared computers
   - Use secure networks for admin access

### Data Management Best Practices
1. **Regular Backups**
   - Export product data monthly
   - Save quote information regularly
   - Keep backup copies in secure locations

2. **Image Management**
   - Use high-quality product images
   - Optimize image sizes for web
   - Maintain consistent image styles

## 🛠️ Troubleshooting Common Issues

### Customer Issues

#### Search Not Working
- **Problem**: No results when searching
- **Solution**: Check spelling, try broader terms, clear filters

#### Images Not Loading
- **Problem**: Product images not displaying
- **Solution**: Check internet connection, refresh page, contact admin

#### Mobile Menu Issues
- **Problem**: Menu not opening on mobile
- **Solution**: Refresh page, check for JavaScript errors, try different browser

### Admin Issues

#### Login Problems
- **Problem**: Cannot access admin panel
- **Solution**: 
  - Verify username and password
  - Clear browser cache and cookies
  - Contact technical support

#### File Upload Issues
- **Problem**: Cannot upload images or CSV files
- **Solution**:
  - Check file size (should be under 10MB)
  - Verify file format (JPG, PNG for images; CSV for data)
  - Try different browser
  - Check internet connection stability

#### CSV Upload Errors
- **Problem**: Errors during bulk upload
- **Solution**:
  - Check CSV format matches sample
  - Ensure all required columns are present
  - Verify data in each row is complete
  - Check for special characters in product names

## 📞 Support and Contact Information

### Technical Support
- **Email**: support@freshberry.com
- **Phone**: [Your support number]
- **Business Hours**: [Your business hours]

### Feature Requests
- Submit suggestions for new features
- Request custom modifications
- Discuss integration requirements

### Training and Assistance
- **Initial Setup**: Guidance for first-time use
- **Staff Training**: Train multiple team members
- **Advanced Features**: Learn about new capabilities

## 📈 Tips for Success

### Maximizing Customer Engagement
1. **Keep Products Updated**
   - Regular price updates
   - Fresh product images
   - Accurate descriptions and availability

2. **Use Hot-Selling Feature**
   - Mark popular products as hot-selling
   - Rotate featured products regularly
   - Highlight seasonal items

3. **Respond to Quotes Quickly**
   - Check admin panel daily for new quotes
   - Respond to customer inquiries promptly
   - Provide detailed and competitive quotes

### Growing Your Business
1. **SEO Optimization**
   - Use descriptive product names
   - Include relevant keywords in descriptions
   - Add origin information for local SEO

2. **Social Media Integration**
   - Share product links on social media
   - Use WhatsApp ordering feature
   - Encourage customer reviews and feedback

3. **Data Analysis**
   - Export product data for analysis
   - Track popular search terms
   - Monitor quote conversion rates

## 🔄 Regular Maintenance Tasks

### Daily Tasks
- [ ] Check for new quotes
- [ ] Respond to customer inquiries
- [ ] Review and approve new orders

### Weekly Tasks
- [ ] Update product prices if needed
- [ ] Add new products to catalog
- [ ] Review hot-selling product performance

### Monthly Tasks
- [ ] Export product database for backup
- [ ] Analyze search and quote data
- [ ] Update product images and descriptions
- [ ] Review and update business information

---

**User Manual Version**: 1.0  
**Last Updated**: August 2025  
**Support Contact**: support@freshberry.com
