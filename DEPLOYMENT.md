# 🚀 Deployment Guide for Portfolio Website

This guide explains how to deploy your portfolio website with the Huffman Compression and Checkers AI demos.

## 📋 Overview

Your portfolio consists of:
- **Frontend**: React app (deploy to Netlify)
- **Huffman Backend**: Python Flask app (deploy to Railway/Render)
- **Checkers AI Backend**: Python Flask app (deploy to Railway/Render)

## 🌐 Frontend Deployment (Netlify)

### Step 1: Prepare for Deployment
```bash
# Build the production version
npm run build

# Test locally
npm install -g serve
serve -s build
```

### Step 2: Deploy to Netlify
1. Go to [Netlify](https://netlify.com)
2. Drag and drop your `build` folder
3. Or connect your GitHub repository for automatic deployments

## 🐍 Backend Deployment (Railway - Recommended)

### Option 1: Railway (Easiest)

#### Huffman Backend:
1. Go to [Railway](https://railway.app)
2. Create new project from GitHub
3. Select your `huffman-backend` folder
4. Railway will auto-detect Python and install dependencies

#### Checkers AI Backend:
1. Create another Railway project
2. Select your `Checkers AI` folder
3. Railway will auto-detect Python and install dependencies

### Option 2: Render (Free Tier Available)

#### For Huffman Backend:
1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Set:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
   - **Environment**: `Python 3`

#### For Checkers AI:
1. Repeat the same process for the Checkers AI folder

## ⚙️ Configuration

### Step 1: Update Backend URLs
After deploying your backends, update `src/config/backend.js`:

```javascript
// Replace these with your actual deployed URLs
return {
  huffman: 'https://your-huffman-backend.railway.app',
  checkers: 'https://your-checkers-backend.railway.app'
};
```

### Step 2: Environment Variables (Optional)
Create a `.env` file for local development:
```bash
REACT_APP_HUFFMAN_BACKEND_URL=http://localhost:5000
REACT_APP_CHECKERS_BACKEND_URL=http://localhost:5000
```

## 🔧 Backend Requirements

### Huffman Backend (`huffman-backend/requirements.txt`):
```
flask==2.3.3
flask-cors==4.0.0
```

### Checkers AI Backend (`Checkers AI/requirements.txt`):
```
flask==2.3.3
flask-cors==4.0.0
```

## 🚨 Important Notes

1. **CORS Configuration**: Both backends already have CORS enabled for `localhost:3000`
2. **Port Configuration**: Update CORS origins in backend files to include your Netlify domain
3. **File Upload Limits**: Some hosting services have file size limits
4. **Cold Starts**: Serverless functions may have cold start delays

## 🔄 CORS Updates

After deploying, update CORS in both backend files:

### Huffman Backend (`huffman-backend/app.py`):
```python
CORS(app, origins=[
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://your-netlify-app.netlify.app'  # Add your Netlify URL
], supports_credentials=True)
```

### Checkers AI (`Checkers AI/app.py`):
```python
CORS(app, origins=[
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://your-netlify-app.netlify.app'  # Add your Netlify URL
], supports_credentials=True)
```

## 📊 Deployment Checklist

- [ ] Frontend deployed to Netlify
- [ ] Huffman backend deployed to Railway/Render
- [ ] Checkers AI backend deployed to Railway/Render
- [ ] Backend URLs updated in `src/config/backend.js`
- [ ] CORS origins updated in both backend files
- [ ] Test all demos work in production
- [ ] Check file upload/download functionality
- [ ] Verify AI game logic works correctly

## 🆘 Troubleshooting

### Common Issues:
1. **CORS Errors**: Update CORS origins in backend files
2. **File Upload Fails**: Check file size limits on hosting service
3. **AI Not Responding**: Check backend logs for errors
4. **Build Failures**: Ensure all dependencies are in requirements.txt

### Testing:
```bash
# Test locally with production URLs
npm start
# Open browser and test both demos
```

## 💡 Alternative Hosting Options

- **Heroku**: Popular but requires paid plans
- **PythonAnywhere**: Simple Python hosting
- **Fly.io**: Modern deployment platform
- **DigitalOcean App Platform**: Full-stack hosting
- **AWS Lambda**: Serverless functions (with limitations)
