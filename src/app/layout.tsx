import type {Metadata} from 'next';
import './globals.css';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { FloatingWhatsAppButton } from '@/components/layout/whatsapp-button';
import { COMPANY_NAME, TAGLINE } from '@/lib/constants';
import { CartProvider } from '@/hooks/use-cart';
import { AuthProvider } from '@/hooks/use-auth';
import { MainLayout } from '@/components/layout/main-layout';

export const metadata: Metadata = {
  title: {
    default: COMPANY_NAME,
    template: `%s | ${COMPANY_NAME}`,
  },
  description: TAGLINE,
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <AuthProvider>
          <CartProvider>
            <MainLayout>
              {children}
            </MainLayout>
            <FloatingWhatsAppButton />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
