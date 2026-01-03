---
NI_CHE: ""
PRODUCT_NAME: ""
PRIMARY_COLOR_THEME: ""
SECONDARY_COLOR_THEME: ""
TARGET_AUDIENCE: ""
VALUE_PROPOSITION: ""
---

# Part 2: The .env Template

```env
# ========================================
# PRODUCTION ENVIRONMENT VARIABLES
# ========================================

# STRIPE (PAYMENTS)
STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_SECRET_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# FRONTEND KEYS
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_PUBLISHABLE_KEY_HERE
VITE_API_URL=http://localhost:4242

# EMAIL CONFIGURATION (TRANSACTIONAL)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password

# CONTACT FORM RECIPIENT
CONTACT_EMAIL=support@yourdomain.com

# SERVER CONFIGURATION
PORT=4242
NODE_ENV=production
```

# Part 3: The Code Skeleton (Contact Page)

```jsx
/*
  ========================================
  CONTACT PAGE SKELETON
  ========================================
  Contains:
  - ContactPage (Wrapper)
  - Contact2 (Form Component)
*/

import React, { useState } from "react";
// Assumes UI components exist in your design system or shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OutlineText } from "@/components/ui/outline-text";

// ==========================================
// COMPONENT: Contact2 (Form Logic)
// ==========================================
export const Contact2 = ({
    title = "{{CONTACT_TITLE}}",
    description = "{{CONTACT_DESCRIPTION}}",
    phone = "{{SUPPORT_PHONE}}",
    email = "{{SUPPORT_EMAIL}}",
    web = { label: "{{WEBSITE_LABEL}}", url: "{{WEBSITE_URL}}" },
}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "x-render-secret": import.meta.env.VITE_PUBLIC_RENDER_SECRET || ""
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.userEmail,
                    subject: formData.subject,
                    message: formData.message
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', userEmail: '', subject: '', message: '' });
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
                    <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
                        <div className="text-center lg:text-left">
                            <div className="mb-6">
                                <OutlineText>{title}</OutlineText>
                            </div>

                            <p className="text-muted-foreground">{description}</p>
                        </div>
                        <div className="mx-auto w-fit lg:mx-0">
                            <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                                {{CONTACT_DETAILS_HEADER}}
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>
                                    <span className="font-bold">Email: </span>
                                    <a href={`mailto:${email}`} className="underline">
                                        {email}
                                    </a>
                                </li>
                                <li>
                                    <span className="font-bold">Web: </span>
                                    <a href={web.url} target="_blank" className="underline">
                                        {web.label}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-lg border p-10 bg-white">
                        {status === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{{SUCCESS_MESSAGE_TITLE}}</h3>
                                <p className="text-gray-600 mb-6">{{SUCCESS_MESSAGE_BODY}}</p>
                                <Button type="button" onClick={() => setStatus('idle')} variant="outline">{{SEND_ANOTHER_BUTTON}}</Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="firstName">{{LABEL_FIRST_NAME}}</Label>
                                        <Input
                                            type="text"
                                            id="firstName"
                                            placeholder="{{PLACEHOLDER_FIRST_NAME}}"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="lastName">{{LABEL_LAST_NAME}}</Label>
                                        <Input
                                            type="text"
                                            id="lastName"
                                            placeholder="{{PLACEHOLDER_LAST_NAME}}"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="userEmail">{{LABEL_EMAIL}}</Label>
                                    <Input
                                        type="email"
                                        id="userEmail"
                                        placeholder="{{PLACEHOLDER_EMAIL}}"
                                        value={formData.userEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="subject">{{LABEL_SUBJECT}}</Label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        placeholder="{{PLACEHOLDER_SUBJECT}}"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">{{LABEL_MESSAGE}}</Label>
                                    <Textarea
                                        placeholder="{{PLACEHOLDER_MESSAGE}}"
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="min-h-[120px]"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="text-red-600 bg-red-50 p-3 rounded text-sm text-center">
                                        {{ERROR_MESSAGE}}
                                    </div>
                                )}

                                <Button className="w-full" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? '{{BUTTON_SENDING}}' : '{{BUTTON_SEND}}'}
                                </Button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

// ==========================================
// PAGE: ContactPage
// ==========================================
const ContactPage = () => {
    return (
        <Contact2
            title="{{CONTACT_TITLE}}"
            description="{{CONTACT_DESCRIPTION}}"
            email="{{CONTACT_EMAIL}}"
        />
    );
};

export default ContactPage;
```
