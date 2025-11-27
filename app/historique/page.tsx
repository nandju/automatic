"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, XCircle, Trash2 } from "lucide-react"

interface VerificationResult {
  date: string
  codeSouche: string
  codeBagage: string
  conforme: boolean
}

export default function HistoriquePage() {
  const [historique, setHistorique] = useState<VerificationResult[]>([])
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Charger l'historique
    const historiqueData = JSON.parse(localStorage.getItem("historique") || "[]")
    setHistorique(historiqueData)
  }, [router])

  const handleClearHistory = () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer tout l'historique ?")) {
      localStorage.removeItem("historique")
      setHistorique([])
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
              <h1 className="text-2xl font-bold text-foreground">Historique des vérifications</h1>
              <p className="text-muted-foreground mt-1">
                Liste de toutes les vérifications effectuées
              </p>
            </div>
          </div>
          {historique.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
              title="Supprimer l'historique"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Liste */}
        {historique.length === 0 ? (
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
            {historique.map((verification, index) => (
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
        )}
      </div>
    </div>
  )
}

