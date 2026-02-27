import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/layout/navbar"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Generative Workflows | AI-Powered Building Design",
  description: "Transform text prompts into stunning 3D building concepts in seconds. No-code workflow builder for architects.",
  keywords: ["AI", "architecture", "building design", "3D modeling", "generative design", "AEC"],
  authors: [{ name: "Generative Workflows" }],
  openGraph: {
    title: "Generative Workflows | AI-Powered Building Design",
    description: "Transform text prompts into stunning 3D building concepts in seconds",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generative Workflows | AI-Powered Building Design",
    description: "Transform text prompts into stunning 3D building concepts in seconds",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <Navbar />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  )
}
