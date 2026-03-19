import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/forms/contact-form';
import { CONTACT_EMAIL, CONTACT_PHONE, ADDRESS, MAP_LOCATION_URL } from '@/lib/constants';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Stone Craft Hub for inquiries, orders, or expert advice.',
}

export default function ContactPage() {
  return (
    <>
    <div className="container py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We're here to help. Reach out to us for inquiries, quotes, or to discuss your project needs.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mt-16 items-start">
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Phone</h3>
                    <p className="text-muted-foreground">Our team is available to talk.</p>
                    <a href={`tel:${CONTACT_PHONE}`} className="text-primary hover:underline font-medium">{CONTACT_PHONE}</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">Send us an email anytime.</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-medium">{CONTACT_EMAIL}</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Office</h3>
                    <p className="text-muted-foreground">Visit our showroom.</p>
                    <p className="text-primary font-medium">{ADDRESS}</p>
                </div>
            </div>
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
      
    </div>
    <div className="w-full">
        <div className="aspect-[16/9] md:aspect-[21/9] w-full">
           <iframe
              src={MAP_LOCATION_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
      </div>
    </>
  );
}
