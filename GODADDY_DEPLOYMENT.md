# 🚀 Deploy to GoDaddy - Complete Guide

## 📋 **Pre-Deployment Checklist**

Before deploying, make sure you have:
- [ ] GoDaddy account with paid domain
- [ ] GoDaddy hosting plan (cPanel or VPS)
- [ ] Stripe LIVE API keys
- [ ] Email SMTP credentials (Gmail App Password or SendGrid)
- [ ] All code tested locally

---

## 🎯 **Deployment Options for GoDaddy**

### **Option 1: GoDaddy cPanel Hosting** (Recommended if you have shared hosting)
### **Option 2: GoDaddy VPS** (If you have VPS/Dedicated server)
### **Option 3: External Hosting + GoDaddy Domain** (Best option - recommended!)

---

## ⭐ **RECOMMENDED: Option 3 - External Hosting + GoDaddy Domain**

**Why this is best:**
- ✅ **Easier deployment** - One-click deploys
- ✅ **Better performance** - Optimized for React/Node
- ✅ **Free SSL** - Automatic HTTPS
- ✅ **Auto-scaling** - Handles traffic spikes
- ✅ **CI/CD** - Automatic updates from Git
- ✅ **Keep your domain** - Just point DNS to new host

### **Step-by-Step:**

#### **1. Choose a Hosting Platform**

**For Frontend (React):**
- **Vercel** (Recommended) - Free tier, perfect for React
- **Netlify** - Free tier, great for static sites
- **Cloudflare Pages** - Free tier, fast CDN

**For Backend (Node.js):**
- **Railway** - $5/month, easy Node.js hosting
- **Render** - Free tier available
- **Fly.io** - Free tier, global deployment

---

### **🔥 EASIEST SETUP: Vercel (Frontend) + Railway (Backend)**

#### **A. Deploy Frontend to Vercel**

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival
vercel
```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name? **alpharevive**
   - Directory? **./  (current directory)**
   - Override settings? **N**

5. **Add Environment Variables in Vercel Dashboard:**
   - Go to https://vercel.com/dashboard
   - Select your project
   - Settings → Environment Variables
   - Add:
     ```
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_KEY
     ```

6. **Get your Vercel URL:**
   - Example: `https://alpharevive.vercel.app`

#### **B. Deploy Backend to Railway**

1. **Go to Railway.app:**
   - Sign up at https://railway.app
   - Connect your GitHub account

2. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Or "Empty Project" → "Deploy from local"

3. **Upload server.js:**
   - Create a new folder for backend:
   ```bash
   mkdir alpharevive-backend
   cd alpharevive-backend
   ```
   
   - Copy these files:
     - `server.js`
     - `package.json`
     - `.env` (with LIVE keys)

4. **Add to Git:**
```bash
git init
git add .
git commit -m "Initial backend"
```

5. **Push to Railway:**
   - Follow Railway's instructions to connect repo
   - Or use Railway CLI

6. **Add Environment Variables in Railway:**
   - Go to your project
   - Variables tab
   - Add all from `.env`:
     ```
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

7. **Get your Railway URL:**
   - Example: `https://alpharevive-backend.up.railway.app`

#### **C. Update Frontend to Use Railway Backend**

1. **Update CheckoutPage.jsx:**
   - Find: `http://localhost:4242/create-payment-intent`
   - Replace with: `https://your-railway-url.up.railway.app/create-payment-intent`

2. **Create environment variable:**
   - Add to Vercel:
     ```
     VITE_API_URL=https://your-railway-url.up.railway.app
     ```
   
   - Update code:
     ```javascript
     fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
         // ...
     })
     ```

3. **Redeploy:**
```bash
vercel --prod
```

#### **D. Point GoDaddy Domain to Vercel**

1. **Get Vercel DNS Settings:**
   - Go to Vercel Dashboard
   - Project Settings → Domains
   - Add your domain: `yourdomain.com`
   - Vercel will show DNS records

2. **Update GoDaddy DNS:**
   - Login to GoDaddy
   - My Products → Domains
   - Click your domain → Manage DNS
   - Add/Update these records:
     ```
     Type: A
     Name: @
     Value: 76.76.21.21 (Vercel IP)
     
     Type: CNAME
     Name: www
     Value: cname.vercel-dns.com
     ```

3. **Wait for DNS Propagation:**
   - Takes 5-60 minutes
   - Check: https://dnschecker.org

4. **Verify SSL:**
   - Vercel automatically provisions SSL
   - Your site will be HTTPS

---

## 📦 **Option 1: GoDaddy cPanel Hosting**

**If you want to use GoDaddy hosting (not recommended for React apps):**

### **Challenges:**
- ❌ GoDaddy shared hosting doesn't support Node.js well
- ❌ No easy way to run backend server
- ❌ Limited to static files
- ❌ Manual deployments

### **Workaround - Static Build Only:**

1. **Build your React app:**
```bash
npm run build
```

2. **Upload to GoDaddy:**
   - Login to cPanel
   - File Manager → public_html
   - Upload contents of `dist` folder
   - Delete default index.html

3. **Backend Limitation:**
   - You CANNOT run `server.js` on shared hosting
   - You MUST use external backend (Railway, Render, etc.)
   - Update frontend to point to external backend URL

4. **Setup .htaccess for React Router:**
   - Create `.htaccess` in public_html:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 🖥️ **Option 2: GoDaddy VPS**

**If you have VPS hosting:**

### **Setup:**

1. **SSH into your VPS:**
```bash
ssh root@your-vps-ip
```

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2:**
```bash
npm install -g pm2
```

4. **Upload your code:**
```bash
# On your local machine
scp -r c:\Users\Kubrat\Documents\AlphaRevive\alpha-revival root@your-vps-ip:/var/www/
```

5. **Install dependencies:**
```bash
cd /var/www/alpha-revival
npm install
```

6. **Build frontend:**
```bash
npm run build
```

7. **Start backend:**
```bash
pm2 start server.js --name alpharevive-api
pm2 save
pm2 startup
```

8. **Install Nginx:**
```bash
sudo apt-get install nginx
```

9. **Configure Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Frontend
    location / {
        root /var/www/alpha-revival/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://localhost:4242/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

10. **Get SSL Certificate:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 🔑 **Critical: Switch to LIVE Stripe Keys**

### **1. Get Live Keys from Stripe:**

1. Go to https://dashboard.stripe.com
2. **Switch to LIVE mode** (toggle in top right)
3. Go to Developers → API Keys
4. Copy:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

### **2. Enable Payment Methods:**

1. Go to Settings → Payment Methods
2. Enable:
   - ✅ Cards
   - ✅ Apple Pay
   - ✅ Google Pay
   - ✅ Klarna
   - ✅ Afterpay
   - ✅ PayPal
   - ✅ Link

### **3. Setup Webhooks:**

1. Go to Developers → Webhooks
2. Add endpoint:
   - **URL:** `https://yourdomain.com/webhook`
   - **Events:** Select:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
3. Copy **Signing secret** (starts with `whsec_`)

### **4. Update Environment Variables:**

**In your hosting platform (Vercel, Railway, etc.):**
```env
# Stripe LIVE Keys
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_LIVE_SECRET
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-business-email@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_EMAIL=support@yourdomain.com

# Server
PORT=4242
NODE_ENV=production
```

---

## 📧 **Setup Email (Gmail)**

### **Quick Setup:**

1. **Enable 2FA on Gmail:**
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "AlphaRevive"
   - Copy the 16-character password

3. **Add to Environment Variables:**
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcdefghijklmnop  (no spaces)
```

---

## ✅ **Final Checklist Before Going Live**

### **Code:**
- [ ] Remove hardcoded Stripe test key from `server.js`
- [ ] Update API URLs from localhost to production
- [ ] Test all payment methods
- [ ] Test email sending
- [ ] Test cart persistence
- [ ] Test mobile responsiveness

### **Stripe:**
- [ ] Switch to LIVE mode
- [ ] Get live API keys
- [ ] Enable all payment methods
- [ ] Setup webhook endpoint
- [ ] Test with real card (small amount)

### **Email:**
- [ ] Setup Gmail App Password or SendGrid
- [ ] Test order confirmation emails
- [ ] Test contact form emails
- [ ] Verify emails not going to spam

### **Domain:**
- [ ] Point DNS to hosting
- [ ] Wait for propagation (5-60 min)
- [ ] Verify SSL certificate
- [ ] Test www and non-www versions

### **Security:**
- [ ] Never commit `.env` to Git
- [ ] Use environment variables everywhere
- [ ] Enable HTTPS only
- [ ] Test Stripe webhook signatures

---

## 🎯 **Recommended Deployment Path**

**For fastest, easiest deployment:**

1. **Frontend:** Vercel (free)
2. **Backend:** Railway ($5/month)
3. **Domain:** Point GoDaddy DNS to Vercel
4. **Email:** Gmail App Password (free)
5. **Payments:** Stripe (pay-as-you-go)

**Total Cost:** ~$5/month + Stripe fees

**Time to Deploy:** ~30 minutes

---

## 🆘 **Common Issues & Solutions**

### **Issue: "Invalid API Key"**
- ✅ Make sure you're using LIVE keys (pk_live_, sk_live_)
- ✅ Check environment variables are set correctly
- ✅ Restart server after updating env vars

### **Issue: "Payment methods not showing"**
- ✅ Enable them in Stripe Dashboard → Settings → Payment Methods
- ✅ Check browser compatibility (Apple Pay needs Safari)
- ✅ Verify Stripe account is activated

### **Issue: "Emails not sending"**
- ✅ Use App Password, not regular Gmail password
- ✅ Check SMTP settings are correct
- ✅ Verify email isn't in spam folder
- ✅ Test with a different email provider

### **Issue: "Site not loading"**
- ✅ Wait for DNS propagation (up to 24 hours)
- ✅ Clear browser cache
- ✅ Check DNS settings in GoDaddy
- ✅ Verify hosting is active

---

## 📞 **Need Help?**

1. **Vercel Docs:** https://vercel.com/docs
2. **Railway Docs:** https://docs.railway.app
3. **Stripe Docs:** https://stripe.com/docs
4. **GoDaddy Support:** https://www.godaddy.com/help

---

## 🎉 **You're Ready to Go Live!**

Follow the **Vercel + Railway** path for the easiest deployment. Your site will be live in under an hour!

**Good luck with your launch!** 🚀
