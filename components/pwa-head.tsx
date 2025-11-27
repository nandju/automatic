"use client"

import { useEffect } from "react"

export default function PWAHead() {
  useEffect(() => {
    // Ajouter les balises meta nécessaires pour la PWA
    const addMetaTag = (name: string, content: string, attribute: string = "name") => {
      if (!document.querySelector(`meta[${attribute}="${name}"]`)) {
        const meta = document.createElement("meta")
        meta.setAttribute(attribute, name)
        meta.setAttribute("content", content)
        document.head.appendChild(meta)
      }
    }

    // Ajouter le lien vers le manifest
    if (!document.querySelector('link[rel="manifest"]')) {
      const link = document.createElement("link")
      link.rel = "manifest"
      link.href = "/manifest.json"
      document.head.appendChild(link)
    }

    // Ajouter les meta tags
    addMetaTag("theme-color", "#7a7fee")
    addMetaTag("apple-mobile-web-app-capable", "yes")
    addMetaTag("apple-mobile-web-app-status-bar-style", "default")
    addMetaTag("apple-mobile-web-app-title", "Automatic")
    addMetaTag("mobile-web-app-capable", "yes")
  }, [])

  return null
}

