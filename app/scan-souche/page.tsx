"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import QRScanner from "@/components/qr-scanner"
import { ArrowLeft, QrCode, RotateCcw } from "lucide-react"
import { saveScanRecord, getScanHistory, type ScanRecord } from "@/utils/scan-history"

export default function ScanSouchePage() {
  const [codeSouche, setCodeSouche] = useState<string | null>(null)
  const [scanHistory, setScanHistory] = useState<ScanRecord[]>([])
  const [resetScan, setResetScan] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Récupérer le code souche s'il existe déjà
    const savedCode = localStorage.getItem("codeSouche")
    if (savedCode) {
      setCodeSouche(savedCode)
    }

    // Charger l'historique des scans de souche
    const history = getScanHistory().filter((scan) => scan.type === "souche")
    setScanHistory(history)
  }, [router])

  const handleScanSuccess = (decodedText: string) => {
    // Enregistrer le scan dans l'historique
    saveScanRecord("souche", decodedText)
    
    // Mettre à jour le code souche
    setCodeSouche(decodedText)
    localStorage.setItem("codeSouche", decodedText)
    
    // Mettre à jour l'historique affiché
    const history = getScanHistory().filter((scan) => scan.type === "souche")
    setScanHistory(history)
    
    // Réinitialiser l'affichage du scanner pour permettre un nouveau scan
    setResetScan(true)
    setTimeout(() => setResetScan(false), 100)
  }

  const handleContinue = () => {
    if (codeSouche) {
      router.push("/scan-bagage")
    }
  }

  const handleBack = () => {
    router.push("/")
  }

  const handleReset = () => {
    setCodeSouche(null)
    localStorage.removeItem("codeSouche")
    setResetScan(true)
    setTimeout(() => setResetScan(false), 100)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date)
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
              <QrCode className="w-6 h-6 text-[#7a7fee]" />
              Scanner la souche (ticket)
            </h1>
            <p className="text-muted-foreground mt-1">
              Scannez le QR code ou code-barres de la souche (scans multiples autorisés)
            </p>
          </div>
        </div>

        {/* Scanner */}
        <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-[#2a2a2a] mb-6">
          <QRScanner
            onScanSuccess={handleScanSuccess}
            title="Scanner la souche"
            description="Positionnez le QR code ou code-barres de la souche dans le cadre"
            allowMultipleScans={true}
            resetScan={resetScan}
          />
        </div>

        {/* Code actuel */}
        {codeSouche && (
          <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-[#2a2a2a] mb-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                <QrCode className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Code souche actuel</h2>
              <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-1">Code souche :</p>
                <p className="font-mono text-lg font-semibold break-all">{codeSouche}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-foreground font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Réinitialiser
                </button>
                <button
                  onClick={handleContinue}
                  className="flex-1 bg-[#7a7fee] hover:bg-[#6a6fde] text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Continuer vers le scan du bagage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Historique des scans */}
        {scanHistory.length > 0 && (
          <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-[#2a2a2a]">
            <h3 className="text-lg font-semibold mb-4">Historique des scans de souche</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {scanHistory.slice(0, 10).map((scan) => (
                <div
                  key={scan.id}
                  className={`p-3 rounded-lg border ${
                    scan.code === codeSouche
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-[#2a2a2a] border-gray-200 dark:border-[#2a2a2a]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-sm font-semibold break-all">{scan.code}</p>
                      <p className="text-xs text-muted-foreground mt-1">{formatDate(scan.date)}</p>
                    </div>
                    {scan.code === codeSouche && (
                      <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                        Actuel
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {scanHistory.length > 10 && (
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {scanHistory.length - 10} scan(s) supplémentaire(s) dans l'historique complet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

