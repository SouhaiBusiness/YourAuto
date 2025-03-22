import type React from 'react';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'YourAuto',
  description: 'Rent your dream car effortlessly. Affordable rates, top brands, and smooth bookings!',
  icons: "/favicon.ico", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang='en'>
      <body className={`${outfit.variable}`}>
        <NavBar />
        {children}
        {/*<ClerkProvider>
          <SignedIn>
          </SignedIn>
          <SignedOut>
            <SignIn />  
          </SignedOut>
        </ClerkProvider>*/}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
