import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prchecker',
  description: 'A cutting-edge tool that tirelessly monitors, identifies, and delivers a myriad of enhancements',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
