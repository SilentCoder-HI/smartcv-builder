import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SmartCV Builder | AI-Powered Resume Builder',
  description: 'Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Choose from stunning templates or let AI design one for you. Download as PDF or Word. Modern, minimal, classic, and creative templates available.',
  generator: 'SmartCV Builder',
  keywords: [
    'AI Resume Builder',
    'SmartCV',
    'ATS-friendly resume',
    'Professional CV templates',
    'AI-powered CV',
    'Modern resume templates',
    'Minimal resume templates',
    'Classic resume templates',
    'Creative resume templates',
    'Corporate resume templates',
    'Elegant resume templates',
    'PDF resume export',
    'Word resume export',
    'Job application',
    'Resume generator',
    'AI content generation',
    'Live resume preview'
  ],
  openGraph: {
    title: 'SmartCV Builder | AI-Powered Resume Builder',
    description: 'Build your perfect resume in minutes with AI-powered content and stunning, ATS-friendly templates. Download as PDF or Word.',
    url: 'https://smartcv-builder.com',
    siteName: 'SmartCV Builder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SmartCV Builder - AI Resume Templates'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCV Builder | AI-Powered Resume Builder',
    description: 'Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Choose from stunning templates or let AI design one for you.',
    images: ['/og-image.png']
  },
  authors: [
    { name: 'SilentCoder-HI', url: 'https://github.com/SilentCoder-HI' }
  ],
  creator: 'SilentCoder-HI',
  publisher: 'SmartCV Builder',
  metadataBase: new URL('https://smartcv-builder.com')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer/>
      </body>
    </html>
  )
}
