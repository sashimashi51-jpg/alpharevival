# 🚀 Quick Deployment Checklist

## ⏱️ **30-Minute Deployment Plan**

Follow this exact order for fastest deployment:

---

## 📋 **Phase 1: Preparation (5 minutes)**

### **1. Get Your Credentials Ready:**
- [ ] GoDaddy domain name
- [ ] Stripe LIVE Publishable Key (`pk_live_...`)
- [ ] Stripe LIVE Secret Key (`sk_live_...`)
- [ ] Gmail email address
- [ ] Gmail App Password (16 characters)

### **2. Clean Up Code:**
- [ ] Open `server.js`
- [ ] Remove the hardcoded test key on line ~10
- [ ] Save the file

---

## 📋 **Phase 2: Deploy Backend (10 minutes)**

### **Railway.app (Recommended):**

1. **Sign up:** https://railway.app
2. **New Project** → **Empty Project**
3. **Create folder for backend:**
   ```bash
   mkdir c:\Users\Kubrat\Documents\AlphaRevive\backend
   cd c:\Users\Kubrat\Documents\AlphaRevive\backend
   ```

4. **Copy files:**
   - Copy `server.js` to backend folder
   - Copy `package.json` to backend folder
   - Create new `.env` with LIVE keys:
   ```env
   STRIPE_SECRET_KEY=sk_live_YOUR_KEY
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=support@yourdomain.com
   PORT=4242
   NODE_ENV=production
   ```

5. **Deploy:**
   - Drag & drop folder to Railway
   - Or connect GitHub repo
   - Railway will auto-detect Node.js

6. **Add Environment Variables:**
   - Go to Variables tab
   - Add all from `.env` file above

7. **Copy your Railway URL:**
   - Example: `https://alpharevive-production.up.railway.app`

---

## 📋 **Phase 3: Deploy Frontend (10 minutes)**

### **Vercel (Recommended):**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Update API URL in code:**
   - Open `src/pages/CheckoutPage.jsx`
   - Find line ~148: `http://localhost:4242/create-payment-intent`
   - Replace with your Railway URL:
   ```javascript
   fetch("https://your-railway-url.up.railway.app/create-payment-intent", {
   ```

3. **Deploy:**
   ```bash
   cd c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival
   vercel
   ```

4. **Follow prompts:**
   - Login with GitHub/Email
   - Set up project: **Y**
   - Project name: **alpharevive**
   - Directory: **./**
   - Override settings: **N**

5. **Add Environment Variable:**
   - Go to https://vercel.com/dashboard
   - Select project → Settings → Environment Variables
   - Add:
     ```
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
     ```

6. **Deploy to production:**
   ```bash
   vercel --prod
   ```

7. **Copy your Vercel URL:**
   - Example: `https://alpharevive.vercel.app`

---

## 📋 **Phase 4: Connect Domain (5 minutes)**

### **Point GoDaddy to Vercel:**

1. **Add domain in Vercel:**
   - Vercel Dashboard → Project → Settings → Domains
   - Add: `yourdomain.com`
   - Add: `www.yourdomain.com`

2. **Get DNS records from Vercel:**
   - Vercel will show you what to add

3. **Update GoDaddy DNS:**
   - Login to GoDaddy
   - My Products → Domains → Manage DNS
   - Add these records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   TTL: 600
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600
   ```

4. **Wait 5-30 minutes** for DNS propagation

5. **Verify:**
   - Visit `https://yourdomain.com`
   - Should see your site with SSL! 🎉

---

## 📋 **Phase 5: Stripe Setup (5 minutes)**

### **Enable Live Mode:**

1. **Switch to Live Mode:**
   - https://dashboard.stripe.com
   - Toggle switch in top right

2. **Enable Payment Methods:**
   - Settings → Payment Methods
   - Enable: Cards, Apple Pay, Google Pay, Klarna, Afterpay, PayPal

3. **Setup Webhook:**
   - Developers → Webhooks → Add endpoint
   - URL: `https://your-railway-url.up.railway.app/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy signing secret → Add to Railway env vars

4. **Test Payment:**
   - Use real card with $1
   - Verify it works
   - Refund immediately in Stripe Dashboard

---

## ✅ **Final Verification**

### **Test Everything:**

- [ ] Visit `https://yourdomain.com`
- [ ] Add product to cart
- [ ] Refresh page - cart should persist
- [ ] Go to checkout
- [ ] See express checkout buttons (Apple Pay, Google Pay)
- [ ] See payment methods info box
- [ ] Fill out form
- [ ] Complete test purchase ($1)
- [ ] Verify redirect to success page
- [ ] Check email for order confirmation
- [ ] Refund test transaction in Stripe

---

## 🎯 **Quick Reference**

### **Your URLs:**
- **Frontend:** `https://yourdomain.com` (via Vercel)
- **Backend:** `https://your-app.up.railway.app` (Railway)
- **Stripe:** `https://dashboard.stripe.com`

### **Important Files:**
- **Frontend env:** Vercel Dashboard → Environment Variables
- **Backend env:** Railway Dashboard → Variables
- **Stripe keys:** Stripe Dashboard → Developers → API Keys

### **Costs:**
- **Vercel:** FREE
- **Railway:** ~$5/month
- **GoDaddy Domain:** Already paid
- **Stripe:** 2.9% + $0.30 per transaction

---

## 🆘 **Troubleshooting**

### **Site not loading:**
- Wait 30 more minutes for DNS
- Clear browser cache
- Try incognito mode

### **Payment not working:**
- Check you're using LIVE keys (pk_live_, sk_live_)
- Verify payment methods enabled in Stripe
- Check browser console for errors

### **Email not sending:**
- Verify Gmail App Password (not regular password)
- Check spam folder
- Test with different email

---

## 🎉 **You're Live!**

**Total Time:** ~30 minutes
**Total Cost:** ~$5/month

Your AlphaRevive store is now live and accepting real payments! 🚀

**Next Steps:**
1. Share your site with friends/family
2. Test on different devices
3. Monitor first sales in Stripe Dashboard
4. Celebrate! 🎊
