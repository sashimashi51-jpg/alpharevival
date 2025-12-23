# 🚀 Railway Deployment - Step by Step

## ✅ **Backend Files Ready!**

I've created a `backend` folder with:
- ✅ `server.js` (your API)
- ✅ `package.json` (dependencies)

---

## 📋 **Deploy to Railway (5 Minutes)**

### **Step 1: Sign Up for Railway**
1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended) or email

### **Step 2: Create New Project**
1. Click **"New Project"**
2. Select **"Deploy from local"** or **"Empty Project"**

### **Step 3: Upload Backend Folder**

**Option A: Drag & Drop (Easiest)**
1. Open File Explorer
2. Navigate to: `c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival\backend`
3. Drag the entire `backend` folder to Railway
4. Railway will auto-detect Node.js and deploy!

**Option B: GitHub (Recommended for updates)**
1. Initialize Git in backend folder:
   ```bash
   cd c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival\backend
   git init
   git add .
   git commit -m "Initial backend"
   ```
2. Create GitHub repo
3. Push to GitHub
4. Connect Railway to GitHub repo

### **Step 4: Add Environment Variables**

In Railway dashboard:
1. Click on your project
2. Go to **"Variables"** tab
3. Click **"+ New Variable"**
4. Add these **TEST** variables:

```env
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY_HERE
STRIPE_PUBLISHABLE_KEY=pk_test_51Sg9V72evC9gpar3IEhMVpEqwXjMOZnBGJRSjfuNNjJQzwjCLHjNgXIjJbJZNVNJvJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJjJ
STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_WEBHOOK_SECRET
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
CONTACT_EMAIL=your-email@gmail.com
PORT=4242
NODE_ENV=production
```

**Note:** Use your actual test keys from `.env` file!

### **Step 5: Deploy**

Railway will automatically:
1. Install dependencies (`npm install`)
2. Start server (`npm start`)
3. Assign a public URL

### **Step 6: Get Your Railway URL**

1. In Railway dashboard, click **"Settings"**
2. Under **"Domains"**, click **"Generate Domain"**
3. Copy your URL: `https://alpharevive-production.up.railway.app`

---

## 🔗 **Update Vercel with Railway URL**

### **Step 1: Add API URL to Vercel**
1. Go to https://vercel.com/dashboard
2. Select your **alpha-revival** project
3. Settings → Environment Variables
4. Add new variable:
   ```
   Key: VITE_API_URL
   Value: https://your-railway-url.up.railway.app
   ```
5. Select: Production, Preview, Development
6. Click **Save**

### **Step 2: Redeploy Vercel**
```bash
cd c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival
vercel --prod
```

Or in Vercel dashboard:
- Deployments → Latest → ... → Redeploy

---

## 🧪 **Test Your Deployment**

### **Test Backend:**
Visit: `https://your-railway-url.up.railway.app/`

You should see: `{"message": "AlphaRevive API is running"}`

### **Test Frontend:**
1. Visit: https://alpha-revival.vercel.app
2. Add product to cart
3. Go to checkout
4. Payment form should load!
5. Test with Stripe test card: `4242 4242 4242 4242`

---

## 🔄 **Switch to LIVE Keys Later**

When ready to go live:

### **In Railway:**
1. Variables tab
2. Update these 3 variables:
   ```
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_SECRET
   ```
3. Railway auto-redeploys!

### **In Vercel:**
1. Environment Variables
2. Update:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
   ```
3. Redeploy

**That's it!** No code changes needed! 🎉

---

## ✅ **Checklist**

### **Railway:**
- [ ] Sign up for Railway
- [ ] Create new project
- [ ] Upload backend folder
- [ ] Add environment variables (TEST keys)
- [ ] Get Railway URL
- [ ] Test: Visit URL, see "API is running"

### **Vercel:**
- [ ] Add VITE_API_URL with Railway URL
- [ ] Redeploy
- [ ] Test: Visit site, checkout works

### **Final Test:**
- [ ] Add product to cart
- [ ] Go to checkout
- [ ] See payment form
- [ ] Test payment with 4242 4242 4242 4242
- [ ] See success page
- [ ] Verify email received

---

## 🎯 **Current Status**

**What you have:**
- ✅ Backend folder created
- ✅ Files ready for Railway
- ✅ Frontend on Vercel

**Next steps:**
1. Deploy backend to Railway (5 min)
2. Add Railway URL to Vercel (2 min)
3. Test everything (5 min)
4. Switch to live keys when ready!

---

## 🆘 **Need Help?**

If you get stuck:
1. Check Railway logs (Deployments → View Logs)
2. Verify environment variables are set
3. Test backend URL directly
4. Check browser console for errors

**Ready to deploy?** Just follow the steps above! 🚀
