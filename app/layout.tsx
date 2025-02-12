import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Santa Secret App',
  description: 'Santa Secrete app CSV File made Aditya Rawat Fullstack Engineer python/Nextjs expert',
  keywords:"secret santa game, secrete santa game, code challenge"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Navbar/>
      <body>{children}</body>
    </html>
  )
}
