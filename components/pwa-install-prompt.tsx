"use client"

import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Vérifier si l'app est déjà installée
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Afficher le prompt après un délai
      setTimeout(() => {
        setShowPrompt(true)
      }, 3000)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Ne pas réafficher pendant cette session
    sessionStorage.setItem("pwa-prompt-dismissed", "true")
  }

  // Ne pas afficher si déjà installée ou si l'utilisateur a déjà rejeté
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null
  }

  if (sessionStorage.getItem("pwa-prompt-dismissed") === "true") {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom-5">
      <div className="bg-white dark:bg-[#272829] border border-gray-200 dark:border-[#2a2a2a] rounded-xl shadow-lg p-4 flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-[#7a7fee] rounded-lg flex items-center justify-center">
            <Download className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-sm text-foreground mb-1">
            Installer Automatic
          </h3>
          <p className="text-xs text-muted-foreground">
            Installez l'application pour un accès rapide et une utilisation hors ligne
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="px-4 py-2 bg-[#7a7fee] hover:bg-[#6a6fde] text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Installer
          </button>
          <button
            onClick={handleDismiss}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

