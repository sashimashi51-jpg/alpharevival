# ✅ TEST PHASE DEPLOYMENT - Ready!

## 🎉 **Perfect Strategy!**

Deploy with **TEST keys** → Verify everything → Switch to **LIVE keys**

---

## 📦 **What's Ready:**

### **Backend Folder Created:**
```
c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival\backend\
├── server.js       ✅ Your API
└── package.json    ✅ Dependencies
```

---

## 🚀 **Quick Deployment Steps:**

### **1. Deploy Backend to Railway** (5 min)

1. **Go to:** https://railway.app
2. **Sign up** with GitHub
3. **New Project** → Deploy from local
4. **Drag & drop** the `backend` folder
5. **Add variables** (use your TEST keys from local .env):
   ```
   STRIPE_SECRET_KEY=sk_test_YOUR_TEST_KEY
   STRIPE_WEBHOOK_SECRET=whsec_test_YOUR_SECRET
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   CONTACT_EMAIL=your-email@gmail.com
   PORT=4242
   NODE_ENV=production
   ```
6. **Generate domain** in Settings
7. **Copy Railway URL**

### **2. Update Vercel** (2 min)

1. **Vercel Dashboard** → alpha-revival → Settings → Environment Variables
2. **Add:**
   ```
   VITE_API_URL=https://your-railway-url.up.railway.app
   ```
3. **Redeploy:**
   ```bash
   vercel --prod
   ```

### **3. Test Everything** (5 min)

1. Visit: https://alpha-revival.vercel.app
2. Add product to cart
3. Go to checkout
4. Test payment with: `4242 4242 4242 4242`
5. Verify success page
6. Check email

---

## 🔄 **Switch to LIVE Keys (Later)**

When you're ready to accept real payments:

### **In Railway:**
Update 2 variables:
```
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_SECRET
```

### **In Vercel:**
Update 1 variable:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
```

**That's it!** Railway and Vercel auto-redeploy. No code changes! 🎉

---

## 📋 **Environment Variables Cheat Sheet:**

### **TEST Phase (Now):**

**Railway (Backend):**
- `STRIPE_SECRET_KEY` = `sk_test_...` (from your local .env)
- `STRIPE_WEBHOOK_SECRET` = `whsec_test_...` (create in Stripe test mode)
- Email settings (same for test and live)

**Vercel (Frontend):**
- `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` (from your local .env)
- `VITE_API_URL` = Railway URL

### **LIVE Phase (Later):**

**Railway (Backend):**
- `STRIPE_SECRET_KEY` = `sk_live_...` ← Change this
- `STRIPE_WEBHOOK_SECRET` = `whsec_...` ← Change this
- Email settings (no change)

**Vercel (Frontend):**
- `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_live_...` ← Change this
- `VITE_API_URL` = Railway URL (no change)

---

## 🎯 **Test Cards (Stripe Test Mode):**

Use these for testing:

**Success:**
- `4242 4242 4242 4242` - Visa
- Any future expiry (e.g., 12/25)
- Any 3-digit CVC (e.g., 123)
- Any ZIP code

**Decline:**
- `4000 0000 0000 0002` - Card declined

**3D Secure:**
- `4000 0025 0000 3155` - Requires authentication

---

## ✅ **Benefits of This Approach:**

1. ✅ **Safe Testing** - No risk of real charges
2. ✅ **Easy Switch** - Just update 3 variables
3. ✅ **No Downtime** - Instant deployment
4. ✅ **Reversible** - Can switch back to test anytime
5. ✅ **Professional** - Industry best practice

---

## 📚 **Documentation:**

- **Full Guide:** `RAILWAY_DEPLOY.md`
- **Quick Reference:** This file
- **Environment Template:** `.env.example`

---

## 🚀 **You're Ready!**

1. Deploy backend to Railway with TEST keys
2. Connect Vercel to Railway
3. Test everything works
4. When ready: Update 3 variables to LIVE keys
5. Go live! 🎉

**Follow:** `RAILWAY_DEPLOY.md` for detailed steps!
