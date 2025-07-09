import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/Footer'
import ReduxProvider from '@/components/providers/ReduxProvider'
import ClientInitializer from '@/components/providers/ClientInitializer'
import Providers from '@/components/providers/nextauth'

export const metadata: Metadata = {
  title: 'SmartCV Builder | AI-Powered Resume Builder',
  description: 'Create professional, ATS-friendly resumes in minutes with our AI-powered builder. Choose from stunning templates or let AI design one for you. Download as PDF or Word.',
  keywords: ['AI Resume Builder', 'ATS-friendly resume', 'PDF export', 'Word export', 'Mixtral AI', 'Groq AI', 'Job resume generator'],
  openGraph: {
    title: 'SmartCV Builder | AI-Powered Resume Builder',
    description: 'Build your perfect resume in minutes with AI-powered content and stunning, ATS-friendly templates.',
    url: 'https://smartcv-builder.com',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCV Builder | AI Resume Templates',
    description: 'Create professional, ATS-friendly resumes in minutes using AI.',
    images: ['/og-image.png']
  },
  authors: [{ name: 'SilentCoder-HI', url: 'https://github.com/SilentCoder-HI' }],
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
        <Providers>          
          <ReduxProvider>
            <ClientInitializer>
              <Header />
              {children}
              <Footer />
            </ClientInitializer>
          </ReduxProvider>
        </Providers>
      </body>
    </html>
  )
}
