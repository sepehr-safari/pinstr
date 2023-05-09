import './globals.css';
import { Cairo } from 'next/font/google';

const inter = Cairo({ subsets: ['latin'] });

export const metadata = {
  title: 'Pinstr',
  description: 'Pin stuff to public boards',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`h-full ${inter.className}`}>{children}</body>
    </html>
  );
}
