# 🍓 Fresh Berry - Complete E-commerce Platform

**A modern, responsive e-commerce platform for fresh produce and specialty foods**

## 📋 Project Overview

Fresh Berry is a full-stack web application designed for selling fresh fruits, vegetables, and specialty food products. The platform features a customer-facing website and a comprehensive admin panel for product management.

### 🌟 Key Features

- **Modern Design**: Responsive, mobile-first design with dark/light theme support
- **Real-time Search**: Instant product search as users type
- **Admin Dashboard**: Complete product management system with CSV import/export
- **Quote System**: Customer quote requests with admin management
- **Mobile Optimized**: Full mobile responsiveness with touch-friendly interfaces
- **Image Management**: Advanced image handling with fallbacks and optimization

## 🏗️ Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with Hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: CSS Modules for component-scoped styling
- **Routing**: React Router for client-side navigation
- **State Management**: Context API for theme and authentication
- **Icons**: React Icons library
- **HTTP Client**: Axios for API communication

### Backend (Node.js + Express)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Multer for image processing
- **Environment**: dotenv for configuration
- **CORS**: Cross-origin resource sharing enabled

## 📁 Project Structure

```
Fresh-Berry/
├── Frontend/                    # React application
│   ├── public/                 # Static assets
│   │   ├── logo.jpg           # Company logo
│   │   └── _redirects         # Netlify redirects
│   ├── src/
│   │   ├── Admin/             # Admin panel components
│   │   │   ├── AdminHome/     # Dashboard with statistics
│   │   │   ├── AdminProducts/ # Product management
│   │   │   ├── AdminQoute/    # Quote management
│   │   │   ├── AdminRoute/    # Protected routes
│   │   │   └── Login/         # Admin authentication
│   │   ├── assets/            # Images and static files
│   │   ├── components/        # Main application components
│   │   │   ├── NavBar/        # Navigation with search
│   │   │   ├── Products/      # Product listing and filtering
│   │   │   ├── Home/          # Homepage components
│   │   │   ├── About Us/      # Company information
│   │   │   ├── ContactUs/     # Contact form
│   │   │   ├── HorecaSupply/ # B2B services
│   │   │   ├── Qoute/         # Quote request form
│   │   │   └── Footer/        # Site footer
│   │   ├── context/           # React context providers
│   │   │   └── Theme/         # Theme and auth context
│   │   ├── App.jsx            # Main application component
│   │   └── main.jsx           # Application entry point
│   ├── package.json           # Frontend dependencies
│   ├── vite.config.js         # Vite configuration
│   └── netlify.toml           # Netlify deployment config
├── Backend/                    # Node.js API server
│   ├── controllers/           # Business logic
│   │   ├── adminController.js # Admin authentication
│   │   ├── productController.js # Product CRUD operations
│   │   └── quoteController.js # Quote management
│   ├── middleware/            # Express middleware
│   │   └── upload.js          # File upload handling
│   ├── models/                # MongoDB schemas
│   │   ├── Product.js         # Product data model
│   │   ├── Quote.js           # Quote data model
│   │   └── User.js            # Admin user model
│   ├── routes/                # API route definitions
│   │   ├── adminAuth.js       # Admin authentication routes
│   │   ├── product.js         # Product API routes
│   │   └── quote.js           # Quote API routes
│   ├── uploads/               # Uploaded product images
│   ├── server.js              # Express server setup
│   └── package.json           # Backend dependencies
└── README.md                  # This documentation
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SohailShafiq1/Fresh-Berry.git
   cd Fresh-Berry
   ```

2. **Setup Backend**
   ```bash
   cd Backend
   npm install
   
   # Create .env file with your configuration
   echo "MONGODB_URI=your_mongodb_connection_string
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   PORT=5001" > .env
   
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../Frontend
   npm install
   
   # Create .env file
   echo "VITE_API_URL=http://localhost:5001" > .env
   
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001
   - Admin Panel: http://localhost:5173/admin/login

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/freshberry
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5001
```

## 📱 Features Documentation

### 🏠 Customer Features

#### 1. Homepage
- **Hero Section**: Eye-catching banner with company branding
- **Featured Products**: Showcase of hot-selling items
- **Services Overview**: Company services and offerings
- **About Section**: Company information and values

#### 2. Product Catalog
- **Real-time Search**: Instant filtering as users type
- **Advanced Filtering**: Filter by name, description, origin, and price range
- **Sorting Options**: Sort by price (high/low) and name (A-Z/Z-A)
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Product Cards**: Image, name, description, price, and origin
- **WhatsApp Integration**: Direct order placement via WhatsApp

#### 3. Navigation
- **Responsive Menu**: Mobile-friendly navigation with hamburger menu
- **Search Bar**: Prominent search functionality
- **Theme Toggle**: Light/dark mode support
- **Contact Integration**: Easy access to contact information

#### 4. Quote System
- **Quote Requests**: Customers can request quotes for bulk orders
- **Form Validation**: Client-side validation for required fields
- **Admin Notifications**: Quotes appear in admin dashboard

#### 5. HoReCa Services
- **B2B Focus**: Specialized services for hotels, restaurants, and cafes
- **Bulk Ordering**: Information about wholesale services
- **Custom Solutions**: Tailored offerings for business clients

### 🔧 Admin Features

#### 1. Dashboard
- **Statistics Overview**: Total products, pending quotes, and system metrics
- **Quick Actions**: Fast access to common tasks
- **Recent Activity**: Latest quotes and product additions

#### 2. Product Management
- **CRUD Operations**: Create, read, update, delete products
- **Image Upload**: Support for product images with fallbacks
- **Bulk Operations**: Mark products as hot-selling
- **Advanced Editing**: Modal-based editing interface

#### 3. CSV Import/Export
- **Bulk Upload**: Import products from CSV files
- **Smart Image Handling**: Support for image URLs in CSV
- **Data Validation**: Comprehensive validation during import
- **Export Functionality**: Download all products as CSV
- **Sample Templates**: Downloadable CSV templates

#### 4. Quote Management
- **Quote Review**: View and manage customer quote requests
- **Customer Information**: Access to customer contact details
- **Status Tracking**: Track quote processing status

#### 5. Authentication
- **Secure Login**: Protected admin routes
- **Session Management**: Persistent login sessions
- **Access Control**: Role-based access to admin features

## 🎨 Design System

### Color Palette
- **Primary**: #5c128b (Purple)
- **Success**: #20b958 (Green)
- **Error**: #e53935 (Red)
- **Info**: #1976d2 (Blue)
- **Dark Theme**: #111 background, #333 cards
- **Light Theme**: #fff background, #f0f0f0 cards

### Typography
- **Font Family**: System fonts for optimal performance
- **Headings**: Bold weights for emphasis
- **Body Text**: Regular weight for readability

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔌 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Product Endpoints

#### GET /products
Retrieve all products
```json
Response: [
  {
    "_id": "product_id",
    "name": "Product Name",
    "description": "Product description",
    "price": 10.99,
    "origin": "Product origin",
    "image": "/uploads/image.jpg",
    "hotselling": false
  }
]
```

#### POST /products/add
Create a new product
```javascript
FormData: {
  name: "Product Name",
  description: "Description",
  price: "10.99",
  origin: "Origin",
  image: File // Optional
}
```

#### PUT /products/:id
Update existing product
```javascript
FormData: {
  name: "Updated Name",
  description: "Updated description",
  price: "12.99",
  origin: "Updated origin",
  image: File // Optional
}
```

#### DELETE /products/:id
Delete a product

#### PATCH /products/:id/hotselling
Mark product as hot-selling

#### PATCH /products/:id/unmark-hotselling
Remove hot-selling status

### Quote Endpoints

#### POST /quotes
Create a new quote request
```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "1234567890",
  "message": "Quote request message"
}
```

#### GET /quotes
Retrieve all quotes (Admin only)

### Admin Endpoints

#### POST /admin/login
Admin authentication
```json
{
  "username": "admin",
  "password": "password"
}
```

## 🛠️ Development Guide

### Adding New Features

#### 1. Frontend Components
```javascript
// Create new component in src/components/
import React from 'react';
import styles from './Component.module.css';

const NewComponent = () => {
  return (
    <div className={styles.container}>
      {/* Component content */}
    </div>
  );
};

export default NewComponent;
```

#### 2. Backend Routes
```javascript
// Add route in routes/ directory
const express = require('express');
const router = express.Router();

router.get('/endpoint', (req, res) => {
  // Route logic
  res.json({ message: 'Success' });
});

module.exports = router;
```

#### 3. Database Models
```javascript
// Create model in models/ directory
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  field: { type: String, required: true },
  // Other fields
}, { timestamps: true });

module.exports = mongoose.model('Model', schema);
```

### Code Style Guidelines

- **React**: Use functional components with hooks
- **CSS**: Use CSS Modules for component styling
- **JavaScript**: Use ES6+ features
- **File Naming**: PascalCase for components, camelCase for utilities
- **Comments**: Document complex logic and API endpoints

## 🚀 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Upload `dist` folder to Netlify
3. Configure redirects in `netlify.toml`
4. Set environment variables in Netlify dashboard

### Backend (Railway/Heroku)
1. Create deployment repository
2. Configure environment variables
3. Set up MongoDB connection
4. Deploy using platform-specific tools

### Environment Setup
- Configure production environment variables
- Set up MongoDB Atlas for production database
- Configure file upload service (Cloudinary recommended)

## 🔒 Security Considerations

- **Input Validation**: All user inputs are validated
- **File Upload Security**: Image uploads are restricted and validated
- **Authentication**: Secure admin authentication with JWT
- **CORS**: Configured for specific origins
- **Environment Variables**: Sensitive data in environment files

## 📊 Performance Optimizations

- **Vite Build**: Fast builds and hot module replacement
- **Image Optimization**: Responsive images with fallbacks
- **Code Splitting**: Lazy loading for admin routes
- **CSS Modules**: Scoped styling to prevent conflicts
- **API Caching**: Efficient data fetching strategies

## 🧪 Testing

### Manual Testing Checklist
- [ ] Product search functionality
- [ ] Admin login and product management
- [ ] CSV import/export features
- [ ] Mobile responsiveness
- [ ] Theme switching
- [ ] Quote submission
- [ ] Image upload and display

### Automated Testing (Future Enhancement)
- Unit tests for utility functions
- Integration tests for API endpoints
- E2E tests for critical user flows

## 🐛 Troubleshooting

### Common Issues

#### Frontend not connecting to backend
- Check `VITE_API_URL` in frontend `.env`
- Ensure backend is running on correct port
- Verify CORS configuration

#### Images not displaying
- Check file upload permissions
- Verify image paths in database
- Ensure `uploads` directory exists

#### Admin login issues
- Verify admin credentials in backend `.env`
- Check JWT secret configuration
- Clear browser local storage

#### CSV upload problems
- Ensure correct CSV format
- Check file encoding (UTF-8)
- Verify required columns exist

## 📞 Support and Maintenance

### Regular Maintenance Tasks
- Update dependencies monthly
- Monitor database performance
- Backup product images
- Review and update documentation
- Security updates and patches

### Contact Information
For technical support or questions about this documentation:
- Email: support@freshberry.com
- Phone: [Your contact number]
- GitHub Issues: [Repository issues page]

## 📄 License

This project is proprietary software developed for Fresh Berry. All rights reserved.

---

**Last Updated**: August 2025  
**Version**: 1.0.0  
**Author**: Fresh Berry Development Team
