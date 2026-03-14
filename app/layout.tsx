import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Dezynsekcja Poznań - Profesjonalne Usługi DDD',
  description: 'Kompleksowe usługi DDD: Dezynsekcja, Deratyzacja, Dezynfekcja, Ozonowanie na terenie Poznania i okolic.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${inter.className} bg-[#0a1128] text-gray-100 antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
