import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import ClientWrapper from '@/utils/ClientWrapper'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const castoroRegular = localFont({
  src: '../../../public/assets/font/Castoro-Regular.ttf',
  variable: '--font-castoro-regular',
  display: 'swap',
})

const castoroItalic = localFont({
  src: '../../../public/assets/font/Castoro-Italic.ttf',
  variable: '--font-castoro-italic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Dashboard App',
    default: 'Dashboard App',
  },
  description: 'A more detailed description of my application',
  keywords: ['nextjs', 'react', 'web development'],
  authors: [{ name: 'Chaiyaphat' }],
  creator: 'Chaiyaphat',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://Chaiyaphat.com',
    title: 'Dashboard App',
    description: 'A description of my application',
    siteName: 'Dashboard App',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${castoroRegular.variable} ${castoroItalic.variable} antialiased min-h-screen bg-background text-foreground selection:bg-primary/10`}
      >
        <ClientWrapper>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
          </div>
        </ClientWrapper>
      </body>
    </html>
  )
}
