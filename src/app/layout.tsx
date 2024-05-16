import type { Metadata } from "next";
import '../styles/globals.css';

import { Inter } from 'next/font/google';

import AuthProvider from '@/providers/Auth';
import FirebaseAuthProvider from '@/providers/FirebaseAuth';
import ToastProvider from '@/providers/ToastProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Food Order App",
    template: "%s | Food Order App"
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <FirebaseAuthProvider>
        <html lang="en">
          <body className={inter.className}>
            <ToastProvider>
              <div className='bg-[url("/bg.jpg")] bg-cover min-h-screen'>
                {children}
              </div>
            </ToastProvider>
          </body>
        </html>
      </FirebaseAuthProvider>
    </AuthProvider>
  );
}
