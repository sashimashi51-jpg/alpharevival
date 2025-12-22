# Email Setup - Quick Start Guide

## 🚀 **Get Email Working in 5 Minutes**

### **Step 1: Choose Your Email Provider**

#### **Option A: Gmail (Fastest Setup)**

1. **Create/Use Gmail Account**
   - Use your existing Gmail or create one for business

2. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Turn on 2-Step Verification

3. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "AlphaRevive"
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)

4. **Update `.env` File**
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=abcdefghijklmnop
CONTACT_EMAIL=your-email@gmail.com
```

5. **Restart Server**
```bash
# Stop current server (Ctrl+C)
node server.js
```

---

#### **Option B: SendGrid (Recommended for Production)**

1. **Sign Up**
   - Go to https://sendgrid.com/pricing
   - Choose FREE plan (100 emails/day)

2. **Verify Email**
   - Verify your sender email address
   - Complete domain verification (optional but recommended)

3. **Create API Key**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access"
   - Copy the key (starts with `SG.`)

4. **Update `.env` File**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.your_sendgrid_api_key_here
CONTACT_EMAIL=verified-email@yourdomain.com
```

---

## 🧪 **Test Email Functionality**

### **Test 1: Contact Form**

```bash
# Windows PowerShell
Invoke-RestMethod -Uri "http://localhost:4242/contact" -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"test@example.com","message":"Testing email functionality"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

### **Test 2: Order Confirmation**

1. Go to http://localhost:5173
2. Add product to cart
3. Go to checkout
4. Complete purchase with test card: `4242 4242 4242 4242`
5. Check your email for order confirmation

---

## 🔧 **Troubleshooting**

### **Error: "Invalid login"**
- ✅ Double-check SMTP_USER and SMTP_PASS
- ✅ For Gmail: Ensure you're using App Password, not regular password
- ✅ For SendGrid: Ensure SMTP_USER is literally "apikey"

### **Error: "Connection timeout"**
- ✅ Check SMTP_PORT (should be 587)
- ✅ Ensure firewall allows outbound SMTP
- ✅ Try SMTP_PORT=465 with `secure: true`

### **Emails Going to Spam**
- ✅ Verify your domain with SPF/DKIM records
- ✅ Use a professional "from" address
- ✅ Avoid spam trigger words in subject/body
- ✅ Use SendGrid or AWS SES for better deliverability

### **No Errors But No Email**
- ✅ Check spam/junk folder
- ✅ Check server logs: `console.log` output
- ✅ Verify recipient email is correct
- ✅ Test with a different email provider

---

## 📧 **Email Templates**

### **Customize Order Confirmation Email**

Edit `server.js` line ~70:

```javascript
const sendOrderConfirmation = async (email, orderDetails) => {
    await transporter.sendMail({
        from: '"AlphaRevive" <noreply@alpharevive.com>',
        to: email,
        subject: `Order Confirmation - ${orderDetails.orderNumber}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; }
                    .header { background: #000; color: #fff; padding: 20px; }
                    .content { padding: 20px; }
                    .footer { background: #f5f5f5; padding: 20px; text-align: center; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Thank You for Your Order!</h1>
                </div>
                <div class="content">
                    <p>Hi there,</p>
                    <p>Your order <strong>${orderDetails.orderNumber}</strong> has been confirmed.</p>
                    <p><strong>Total:</strong> $${(orderDetails.amount / 100).toFixed(2)}</p>
                    <p>We'll send you tracking information once your order ships.</p>
                    <p>Expected delivery: 3-5 business days</p>
                </div>
                <div class="footer">
                    <p>Questions? Contact us at support@alpharevive.com</p>
                    <p>&copy; 2025 AlphaRevive. All rights reserved.</p>
                </div>
            </body>
            </html>
        `
    });
};
```

---

## 🎯 **Production Best Practices**

### **1. Use a Professional Email Service**
- ❌ Don't use Gmail for high-volume production
- ✅ Use SendGrid, AWS SES, or Mailgun
- ✅ Verify your domain for better deliverability

### **2. Set Up Email Tracking**
- Track open rates
- Track click rates
- Monitor bounce rates
- Set up unsubscribe links

### **3. Implement Email Queue**
- Use Bull or BullMQ for job queues
- Retry failed emails
- Rate limit to avoid spam flags

### **4. Add Email Templates**
- Use a template engine (Handlebars, EJS)
- Create branded HTML emails
- Include unsubscribe links
- Add social media links

---

## 📊 **Email Limits**

| Provider | Free Tier | Paid Plans |
|----------|-----------|------------|
| Gmail | 500/day | Not recommended for production |
| SendGrid | 100/day | $19.95/mo for 50k emails |
| AWS SES | 62,000/mo | $0.10 per 1,000 emails |
| Mailgun | 5,000/mo | $35/mo for 50k emails |

---

## ✅ **Quick Checklist**

Before deploying:
- [ ] Email credentials added to `.env`
- [ ] Server restarted with new config
- [ ] Contact form tested
- [ ] Order confirmation tested
- [ ] Emails not going to spam
- [ ] Professional "from" address set
- [ ] Error handling in place
- [ ] Logs monitoring email sends

---

## 🆘 **Need Help?**

1. Check server logs for errors
2. Test SMTP connection with online tools
3. Verify credentials are correct
4. Try a different email provider
5. Check firewall/antivirus settings

**Common Gmail App Password Format:**
```
abcd efgh ijkl mnop  ← With spaces (Gmail shows it this way)
abcdefghijklmnop     ← Without spaces (use this in .env)
```

---

## 🎉 **You're Done!**

Your email system is ready. Test it thoroughly before going live!
