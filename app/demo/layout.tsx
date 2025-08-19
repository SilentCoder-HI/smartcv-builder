import './globals.css';

import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider as NextThemesProvider } from "next-themes"; // ✅ Use this

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Demo | SmartCV Builder',
  description: 'Try out demo CVs and templates in the SmartCV Builder app. Explore features and templates before signing up.',
  keywords: ['Demo', 'Resume Templates', 'CV Builder Demo', 'ATS-friendly resume', 'PDF export', 'Word export'],
  openGraph: {
    title: 'Demo | SmartCV Builder',
    description: 'Explore demo CVs and templates in the SmartCV Builder app.',
    url: 'https://smartcv-builder.com/demo',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Demo | SmartCV Builder',
    description: 'Try out demo CVs and templates in the SmartCV Builder app.',
    images: ['/og-image.png']
  },
  icons: {
    icon: '/SmartCV.ico',
    shortcut: '/SmartCV.ico',
  },
  authors: [{ name: 'SilentCoder-HI', url: 'https://github.com/SilentCoder-HI' }],
  metadataBase: new URL('https://smartcv-builder.com')
}

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className + " dark:bg-gray-900"}>
          <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true}>
            {children}
          </NextThemesProvider>
      </body>
    </html>
  );
}
