import './globals.css';

import { SidebarProvider } from '@dashboard/context/SidebarContext';
import { ThemeProvider } from '@dashboard/context/ThemeContext';
import { Outfit } from 'next/font/google';
import { Suspense } from 'react';
import type { Metadata } from 'next';

const outfit = Outfit({
  subsets: ["latin"],
});

// Dashboard metadata in the same style as demo/layout.tsx
export const metadata: Metadata = {
  title: 'Dashboard | SmartCV Builder',
  description: 'Access your SmartCV dashboard to manage your resumes, templates, and account settings.',
  keywords: ['Dashboard', 'Resume Management', 'CV Builder', 'Settings', 'Templates', 'SmartCV'],
  openGraph: {
    title: 'Dashboard | SmartCV Builder',
    description: 'Manage your resumes, templates, and account settings in the SmartCV dashboard.',
    url: 'https://smartcv-builder.com/dashboard',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | SmartCV Builder',
    description: 'Access your SmartCV dashboard to manage your resumes and settings.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/SmartCV.ico',
    shortcut: '/SmartCV.ico',
  },
  authors: [{ name: 'SilentCoder-HI', url: 'https://github.com/SilentCoder-HI' }],
  metadataBase: new URL('https://smartcv-builder.com')
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className + " dark:bg-gray-900"}>
        <Suspense fallback={<div>Loading...</div>}>
          <ThemeProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
