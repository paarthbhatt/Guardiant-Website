import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Guardiant | AI-Native Application Security Testing',
  description: 'Stop chasing false positives. Deploy the Swarm. The first AI-Native AST platform with 8 LLM-powered security agents.',
  keywords: ['application security', 'AST', 'AI security', 'vulnerability detection', 'DevSecOps'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
