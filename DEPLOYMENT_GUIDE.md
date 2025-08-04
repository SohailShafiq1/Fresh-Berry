# 🚀 Fresh Berry - Deployment Guide

## 📋 Deployment Overview

This guide provides step-by-step instructions for deploying the Fresh Berry e-commerce platform to production environments. The application consists of a React frontend and Node.js backend with MongoDB database.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Netlify)     │◄──►│   (Railway)     │◄──►│   (MongoDB)     │
│   React + Vite  │    │   Node.js       │    │   Atlas         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗄️ Database Setup (MongoDB Atlas)

### 1. Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project: "Fresh Berry"

### 2. Create Database Cluster
1. Click "Build a Database"
2. Choose "Shared" (free tier) or "Dedicated" for production
3. Select cloud provider and region closest to your users
4. Name cluster: "fresh-berry-cluster"

### 3. Configure Database Access
1. **Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `freshberry_admin`
   - Password: Generate secure password
   - Role: "Atlas admin" or "Read and write to any database"

2. **Network Access**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` (allow from anywhere) or specific IPs
   - For production: Restrict to your server IPs only

### 4. Get Connection String
1. Go to "Clusters" → Click "Connect"
2. Choose "Connect your application"
3. Copy connection string:
   ```
   mongodb+srv://freshberry_admin:<password>@fresh-berry-cluster.xxxxx.mongodb.net/freshberry?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual password

## 🖥️ Backend Deployment (Railway)

### 1. Prepare Backend for Deployment

#### Update package.json
```json
{
  "name": "fresh-berry-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

#### Create Procfile (if needed)
```
web: node server.js
```

### 2. Deploy to Railway

#### Option A: GitHub Integration
1. Push code to GitHub repository
2. Go to [Railway](https://railway.app)
3. Sign up/login with GitHub
4. Click "New Project" → "Deploy from GitHub repo"
5. Select your Fresh Berry repository
6. Choose backend directory if in monorepo

#### Option B: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### 3. Configure Environment Variables
In Railway dashboard, go to Variables tab and add:

```env
MONGODB_URI=mongodb+srv://freshberry_admin:password@fresh-berry-cluster.xxxxx.mongodb.net/freshberry?retryWrites=true&w=majority
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_admin_password
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
NODE_ENV=production
```

### 4. Configure Domain (Optional)
1. In Railway dashboard, go to Settings
2. Add custom domain or use Railway-provided domain
3. Note the backend URL for frontend configuration

## 🌐 Frontend Deployment (Netlify)

### 1. Prepare Frontend for Deployment

#### Update Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

#### Update Build Configuration
Ensure `package.json` has correct build script:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

#### Configure Redirects
Ensure `public/_redirects` exists:
```
/*    /index.html   200
```

### 2. Build Production Version
```bash
cd Frontend
npm install
npm run build
```

### 3. Deploy to Netlify

#### Option A: Drag and Drop
1. Go to [Netlify](https://www.netlify.com)
2. Sign up/login
3. Drag `dist` folder to deployment area
4. Site will be deployed automatically

#### Option B: Git Integration
1. Push code to GitHub
2. Connect Netlify to your repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: `Frontend` (if in monorepo)

#### Option C: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from dist folder
netlify deploy --prod --dir=dist
```

### 4. Configure Environment Variables
In Netlify dashboard:
1. Go to Site Settings → Environment Variables
2. Add:
   ```
   VITE_API_URL = https://your-backend-url.railway.app
   ```

### 5. Configure Custom Domain (Optional)
1. Go to Site Settings → Domain Management
2. Add custom domain: `www.freshberry.com`
3. Configure DNS records with your domain provider
4. Enable HTTPS (automatic with Netlify)

## 🔧 Post-Deployment Configuration

### 1. Test API Endpoints
```bash
# Test products endpoint
curl https://your-backend-url.railway.app/api/products

# Test admin login
curl -X POST https://your-backend-url.railway.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your_password"}'
```

### 2. Verify Frontend-Backend Connection
1. Open frontend URL
2. Navigate to Products page
3. Verify products are loading
4. Test search functionality
5. Test admin login

### 3. Upload Initial Data

#### Option A: Admin Panel
1. Login to admin panel
2. Add products manually or via CSV upload

#### Option B: Database Seeding
Create seed script for initial data:
```javascript
// seed.js
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Fresh Apples",
    description: "Crispy red apples from local farms",
    price: 5.99,
    origin: "Local Farm",
    hotselling: true
  }
  // Add more products...
];

mongoose.connect(process.env.MONGODB_URI)
  .then(() => Product.insertMany(products))
  .then(() => console.log('Data seeded'))
  .then(() => process.exit());
```

Run with: `node seed.js`

## 🔒 Security Configuration

### 1. Environment Security
- Never commit `.env` files
- Use strong, unique passwords
- Rotate JWT secrets regularly
- Use HTTPS for all communications

### 2. MongoDB Security
- Enable database authentication
- Use connection string with authentication
- Restrict network access to known IPs
- Enable MongoDB's built-in security features

### 3. Application Security
- Keep dependencies updated
- Use security headers
- Implement rate limiting
- Monitor for vulnerabilities

### 4. CORS Configuration
Update backend CORS settings for production:
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-frontend-domain.netlify.app',
    'https://www.freshberry.com'
  ],
  credentials: true
}));
```

## 📊 Monitoring and Maintenance

### 1. Application Monitoring

#### Railway Monitoring
- Monitor CPU and memory usage
- Set up deployment notifications
- Track request volumes and response times

#### Netlify Monitoring
- Monitor build success rates
- Track form submissions
- Monitor bandwidth usage

#### MongoDB Monitoring
- Monitor database performance
- Set up alerts for high CPU/memory
- Track storage usage

### 2. Error Tracking
Consider implementing error tracking:
- **Sentry**: For JavaScript error tracking
- **LogRocket**: For session replay and debugging
- **MongoDB Alerts**: For database issues

### 3. Backup Strategy

#### Database Backups
```bash
# Manual backup
mongodump --uri="mongodb+srv://user:pass@cluster.mongodb.net/freshberry"

# Automated backups (consider MongoDB Atlas backup features)
```

#### File Backups
- Export product data regularly via admin panel
- Backup uploaded images
- Version control for code changes

### 4. Update Procedures

#### Dependency Updates
```bash
# Check for updates
npm outdated

# Update packages
npm update

# Update major versions carefully
npm install package@latest
```

#### Deployment Updates
1. Test changes locally
2. Deploy to staging environment (optional)
3. Deploy to production
4. Verify functionality
5. Monitor for issues

## 🚨 Troubleshooting Common Issues

### Backend Issues

#### Application Won't Start
```bash
# Check logs
railway logs

# Common issues:
# - Environment variables not set
# - Database connection failed
# - Port conflicts
```

#### Database Connection Failed
- Verify connection string
- Check network access settings
- Confirm username/password
- Test connection locally

#### File Upload Issues
- Check disk space
- Verify file permissions
- Check upload size limits
- Monitor memory usage

### Frontend Issues

#### Build Failures
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

#### API Connection Issues
- Verify VITE_API_URL is correct
- Check CORS configuration
- Test API endpoints directly
- Check network connectivity

#### Routing Issues
- Ensure `_redirects` file is in place
- Verify React Router configuration
- Check for conflicting routes

### Performance Issues

#### Slow API Responses
- Check database query performance
- Monitor server resources
- Optimize database indexes
- Consider caching strategies

#### Large Bundle Size
- Analyze bundle with Vite analyzer
- Implement code splitting
- Optimize images and assets
- Remove unused dependencies

## 📞 Support and Resources

### Documentation Links
- [Railway Documentation](https://docs.railway.app)
- [Netlify Documentation](https://docs.netlify.com)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com)
- [Vite Documentation](https://vitejs.dev/guide)

### Support Contacts
- **Technical Issues**: support@freshberry.com
- **Deployment Help**: deployment@freshberry.com
- **Emergency Contact**: [Emergency phone number]

### Useful Commands Reference
```bash
# Railway commands
railway logs
railway shell
railway variables
railway deploy

# Netlify commands
netlify dev
netlify deploy
netlify logs
netlify sites

# MongoDB commands
mongodump
mongorestore
mongo "connection-string"
```

---

**Deployment Guide Version**: 1.0  
**Last Updated**: August 2025  
**Environment**: Production Ready  
**Support**: support@freshberry.com
