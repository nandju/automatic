"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, XCircle, Trash2, QrCode, Package } from "lucide-react"
import {
  getVerificationHistory,
  getScanHistory,
  clearVerificationHistory,
  clearScanHistory,
  clearAllHistory,
  type VerificationResult,
  type ScanRecord,
} from "@/utils/scan-history"

export default function HistoriquePage() {
  const [verifications, setVerifications] = useState<VerificationResult[]>([])
  const [scans, setScans] = useState<ScanRecord[]>([])
  const [activeTab, setActiveTab] = useState<"verifications" | "scans">("verifications")
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Charger les historiques
    const verificationsData = getVerificationHistory()
    const scansData = getScanHistory()
    setVerifications(verificationsData)
    setScans(scansData)
  }, [router])

  const handleClearVerifications = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer l'historique des vérifications ?")) {
      clearVerificationHistory()
      setVerifications([])
    }
  }

  const handleClearScans = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer l'historique des scans ?")) {
      clearScanHistory()
      setScans([])
    }
  }

  const handleClearAll = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ?")) {
      clearAllHistory()
      setVerifications([])
      setScans([])
    }
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

  const handleBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a7fee]/10 via-white to-[#7a7fee]/5 dark:from-[#101112] dark:via-[#101112] dark:to-[#272829] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Historique complet</h1>
              <p className="text-muted-foreground mt-1">
                Vérifications complètes et scans individuels
              </p>
            </div>
          </div>
          {(verifications.length > 0 || scans.length > 0) && (
            <button
              onClick={handleClearAll}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              title="Supprimer tout l'historique"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 border-b border-gray-200 dark:border-[#2a2a2a]">
          <button
            onClick={() => setActiveTab("verifications")}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "verifications"
                ? "text-[#7a7fee] border-b-2 border-[#7a7fee]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Vérifications ({verifications.length})
          </button>
          <button
            onClick={() => setActiveTab("scans")}
            className={`px-4 py-2 font-semibold transition-colors ${
              activeTab === "scans"
                ? "text-[#7a7fee] border-b-2 border-[#7a7fee]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Scans individuels ({scans.length})
          </button>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === "verifications" ? (
          verifications.length === 0 ? (
            <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-[#2a2a2a] text-center">
              <p className="text-muted-foreground text-lg">
                Aucune vérification enregistrée pour le moment
              </p>
              <button
                onClick={() => router.push("/scan-souche")}
                className="mt-6 bg-[#7a7fee] hover:bg-[#6a6fde] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Effectuer une vérification
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {verifications.length > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleClearVerifications}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Supprimer les vérifications
                  </button>
                </div>
              )}
              {verifications.map((verification, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-[#272829] rounded-xl shadow-md p-6 border border-gray-200 dark:border-[#2a2a2a]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {verification.conforme ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-semibold text-foreground">
                          {verification.conforme ? "✔ Conforme" : "❌ Non conforme"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(verification.date)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Code souche :</p>
                      <p className="font-mono text-sm font-semibold break-all">
                        {verification.codeSouche}
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-3">
                      <p className="text-xs text-muted-foreground mb-1">Code bagage :</p>
                      <p className="font-mono text-sm font-semibold break-all">
                        {verification.codeBagage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          scans.length === 0 ? (
            <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-12 border border-gray-200 dark:border-[#2a2a2a] text-center">
              <p className="text-muted-foreground text-lg">
                Aucun scan enregistré pour le moment
              </p>
              <button
                onClick={() => router.push("/scan-souche")}
                className="mt-6 bg-[#7a7fee] hover:bg-[#6a6fde] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Effectuer un scan
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {scans.length > 0 && (
                <div className="flex justify-end mb-2">
                  <button
                    onClick={handleClearScans}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    Supprimer les scans
                  </button>
                </div>
              )}
              {scans.map((scan) => (
                <div
                  key={scan.id}
                  className="bg-white dark:bg-[#272829] rounded-xl shadow-md p-4 border border-gray-200 dark:border-[#2a2a2a]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {scan.type === "souche" ? (
                        <QrCode className="w-5 h-5 text-[#7a7fee] flex-shrink-0" />
                      ) : (
                        <Package className="w-5 h-5 text-[#7a7fee] flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-mono text-sm font-semibold break-all">{scan.code}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            scan.type === "souche"
                              ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                              : "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
                          }`}>
                            {scan.type === "souche" ? "Souche" : "Bagage"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatDate(scan.date)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

