import { Gem } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_NAME, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/constants';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/why-us', label: 'Why Us?' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/faq', label: 'FAQ' },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Gem className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">{COMPANY_NAME}</span>
            </Link>
            <p className="text-sm">
              Your trusted partner for premium quality marble, granite, and Kota stone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>{CONTACT_PHONE}</li>
              <li>{CONTACT_EMAIL}</li>
            </ul>
          </div>
           <div>
            <h3 className="text-lg font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
