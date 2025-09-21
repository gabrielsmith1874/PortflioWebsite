# 🚀 Netlify Deployment Guide

## 📋 **Step-by-Step Deployment**

### **1. Install Netlify CLI** ✅
```bash
npm install netlify-cli -g
```

### **2. Test Functions Locally**
```bash
# Start local development server
netlify dev

# Your site will be available at:
# http://localhost:8888
# Functions at: http://localhost:8888/.netlify/functions/
```

### **3. Test Your Functions**
Open your browser and test:
- **Checkers AI**: `http://localhost:8888` (Projects page → Checkers demo)
- **Huffman**: `http://localhost:8888` (Projects page → Huffman demo)

### **4. Deploy to Netlify**

#### **Option A: Connect via Netlify Dashboard**
1. Go to [Netlify](https://netlify.com)
2. Click **"New site from Git"**
3. Connect your GitHub repository
4. Netlify will auto-detect settings from `netlify.toml`
5. Click **"Deploy site"**

#### **Option B: Deploy via CLI**
```bash
# Login to Netlify
netlify login

# Deploy from current directory
netlify deploy --prod
```

### **5. Configure Production Settings**

After deployment, update CORS origins:

1. **Get your Netlify URL** (e.g., `https://your-site-name.netlify.app`)

2. **Update CORS in your backend files:**

**`Checkers AI/app.py`:**
```python
CORS(app, origins=[
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://your-site-name.netlify.app'  # Add this
], supports_credentials=True)
```

**`huffman-backend/app.py`:**
```python
CORS(app, origins=[
    'http://localhost:3000', 
    'http://127.0.0.1:3000',
    'https://your-site-name.netlify.app'  # Add this
], supports_credentials=True)
```

3. **Redeploy** after updating CORS

## 🔧 **Function Structure**

Your functions are located at:
```
netlify/functions/
├── checkers-ai.py          # Main Checkers function
├── huffman-compress.py     # Main Huffman function
├── checkers-ai-backend/    # Your Python Checkers code
├── huffman-backend/        # Your Python Huffman code
└── requirements.txt        # Python dependencies
```

## 🎯 **Function Endpoints**

### **Checkers AI:**
- `GET /.netlify/functions/checkers-ai/api/get-board`
- `GET /.netlify/functions/checkers-ai/api/state`
- `POST /.netlify/functions/checkers-ai/api/new-game`
- `POST /.netlify/functions/checkers-ai/api/move`

### **Huffman Compression:**
- `POST /.netlify/functions/huffman-compress/compress`
- `POST /.netlify/functions/huffman-compress/decompress`

## 🚨 **Troubleshooting**

### **Functions Not Working:**
1. Check Netlify function logs in dashboard
2. Verify Python files are in correct directories
3. Ensure `requirements.txt` includes all dependencies

### **CORS Errors:**
1. Add your Netlify domain to CORS origins
2. Redeploy after updating CORS settings

### **Import Errors:**
1. Check file paths in `sys.path.append()`
2. Verify all Python modules are copied to functions directory

## ✅ **Success Checklist**

- [ ] Netlify CLI installed
- [ ] Functions work locally (`netlify dev`)
- [ ] Repository connected to Netlify
- [ ] Site deployed successfully
- [ ] CORS origins updated with Netlify URL
- [ ] Both demos work in production
- [ ] No more "Failed to connect" errors

## 🎉 **Final Result**

Once deployed, your portfolio will be:
- ✅ **100% Serverless** - No separate backend hosting needed
- ✅ **Live Demos** - Both Huffman and Checkers AI working
- ✅ **Cost Effective** - Pay only for function usage
- ✅ **Auto-scaling** - Functions scale automatically

**Your portfolio is now ready for production!** 🚀
