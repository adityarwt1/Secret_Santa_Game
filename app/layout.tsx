import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Santa Secret App',
  description: 'Santa Secrete app CSV File made Aditya Rawat Fullstack Engineer',
  keywords:"secret santa game, secrete santa game, code challenge"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
