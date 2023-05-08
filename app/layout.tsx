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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
