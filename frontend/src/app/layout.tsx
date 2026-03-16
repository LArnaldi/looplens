import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LoopLens',
  description: 'Visual node-based editor for game designers',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
