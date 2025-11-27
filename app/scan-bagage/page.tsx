"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QRScanner from "@/components/qr-scanner"
import { ArrowLeft, Package } from "lucide-react"

export default function ScanBagagePage() {
  const [codeBagage, setCodeBagage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Vérifier qu'une souche a été scannée
    const codeSouche = localStorage.getItem("codeSouche")
    if (!codeSouche) {
      router.push("/scan-souche")
      return
    }

    // Récupérer le code bagage s'il existe déjà
    const savedCode = localStorage.getItem("codeBagage")
    if (savedCode) {
      setCodeBagage(savedCode)
    }
  }, [router])

  const handleScanSuccess = (decodedText: string) => {
    setCodeBagage(decodedText)
    localStorage.setItem("codeBagage", decodedText)
    // Redirection automatique vers la page résultat
    setTimeout(() => {
      router.push("/resultat")
    }, 1000)
  }

  const handleBack = () => {
    router.push("/scan-souche")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a7fee]/10 via-white to-[#7a7fee]/5 dark:from-[#101112] dark:via-[#101112] dark:to-[#272829] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Package className="w-6 h-6 text-[#7a7fee]" />
              Scanner le bagage
            </h1>
            <p className="text-muted-foreground mt-1">
              Scannez le QR code du bagage pour comparer avec la souche
            </p>
          </div>
        </div>

        {/* Scanner */}
        <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-[#2a2a2a]">
          {!codeBagage ? (
            <QRScanner
              onScanSuccess={handleScanSuccess}
              title="Scanner le bagage"
              description="Positionnez le QR code du bagage dans le cadre"
            />
          ) : (
            <div className="text-center py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                  <Package className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Code bagage scanné</h2>
                <p className="text-muted-foreground mb-4">
                  Redirection vers le résultat...
                </p>
                <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Code bagage :</p>
                  <p className="font-mono text-lg font-semibold break-all">{codeBagage}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

