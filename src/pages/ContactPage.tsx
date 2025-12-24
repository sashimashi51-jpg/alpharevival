import { Contact2 } from "@/components/ui/contact-2";

const ContactPage = () => {
    return (
        <Contact2
            title="Contact Us"
            description="We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!"
            phone="+359883987033"
            email="support@alpharevive.com"
            web={{ label: "shadcnblocks.com", url: "https://shadcnblocks.com" }}
        />
    );
};

export default ContactPage;
