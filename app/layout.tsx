import type React from "react"
import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/react"
import PWAInstallPrompt from "@/components/pwa-install-prompt"
import PWAHead from "@/components/pwa-head"
import "@/components/styles.css"
import { Suspense } from "react"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "Automatic - Plateforme de vérification automatique bagage / souche",
  description:
    "Plateforme de vérification automatique permettant de scanner et comparer les QR codes des souches (tickets) et des bagages pour vérifier leur conformité.",
  manifest: "/manifest.json",
  themeColor: "#7a7fee",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Automatic",
  },
  icons: {
    icon: [
      { url: "/automatic-favicon-no-bg.png", type: "image/png", sizes: "192x192" },
      { url: "/automatic-favicon-no-bg.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/automatic-favicon-no-bg.png", sizes: "180x180", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={outfit.className}>
        <PWAHead />
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <PWAInstallPrompt />
          </ThemeProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
