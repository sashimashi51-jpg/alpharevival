import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { OutlineText } from "@/components/ui/outline-text";

interface Contact2Props {
    title?: string;
    description?: string;
    phone?: string;
    email?: string;
    web?: { label: string; url: string };
}

export const Contact2 = ({
    title = "Contact Us",
    description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
    phone = "(123) 34567890",
    email = "email@example.com",
    web = { label: "alpharevive.shop", url: "https://alpharevive.shop" },
}: Contact2Props) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userEmail: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Using /api relative path for Vercel
            const apiUrl = import.meta.env.VITE_API_URL || '/api';
            const response = await fetch(`${apiUrl}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "x-render-secret": import.meta.env.VITE_RENDER_SECRET_KEY || ""
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
                                Contact Details
                            </h3>
                            <ul className="ml-4 list-disc">
                                <li>
                                    <span className="font-bold">Phone: </span>
                                    {phone}
                                </li>
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you shortly.</p>
                                <Button type="button" onClick={() => setStatus('idle')} variant="outline">Send Another Message</Button>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            type="text"
                                            id="firstName"
                                            placeholder="First Name"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="grid w-full items-center gap-1.5">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            type="text"
                                            id="lastName"
                                            placeholder="Last Name"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="userEmail">Email</Label>
                                    <Input
                                        type="email"
                                        id="userEmail"
                                        placeholder="Email"
                                        value={formData.userEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid w-full items-center gap-1.5">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        type="text"
                                        id="subject"
                                        placeholder="Subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        placeholder="Type your message here."
                                        id="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        className="min-h-[120px]"
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="text-red-600 bg-red-50 p-3 rounded text-sm text-center">
                                        Something went wrong. Please try again.
                                    </div>
                                )}

                                <Button className="w-full" disabled={status === 'submitting'}>
                                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                                </Button>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};
