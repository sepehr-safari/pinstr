import './globals.css';
import { Cairo } from 'next/font/google';

import { BottomNavbar, Navbar } from '@/components';

const inter = Cairo({ subsets: ['latin'] });

export const metadata = {
  title: 'Pinstr',
  description:
    'A decentralized and open-source social network for curating and sharing your interests with the world.',
  keywords:
    'nostr, bitcoin, decentralized, opensource, pin, board, bookmark, social, socialnetwork',
  manifest: '/manifest.json',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    title: 'Pinstr',
    description:
      'A decentralized and open-source social network for curating and sharing your interests with the world.',
    images: [
      {
        url: 'https://pinstr.app/pinstr.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full pt-16 ${inter.className}`}>
        <Navbar />

        {children}

        <BottomNavbar />
      </body>
    </html>
  );
}
