import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css'
import Providers from '../lib/Providers'
import { Toaster } from 'react-hot-toast'


export const metadata = {
  title: 'CryptoWeather Nexus',
  description: 'Weather + Crypto + Live Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster position="top-right" />
          {children}
        </Providers>
      </body>
    </html>
  )
  
}
