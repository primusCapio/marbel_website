import Link from 'next/link';
import { WhatsAppIcon } from '@/components/icons';
import { WHATSAPP_LINK } from '@/lib/constants';

export function FloatingWhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white rounded-full p-3 shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </Link>
  );
}
