import './globals.css';

import { SidebarProvider } from '@dashboard/context/SidebarContext';
import { ThemeProvider } from '@dashboard/context/ThemeContext';
import { Outfit } from 'next/font/google';
import { Suspense } from 'react';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
