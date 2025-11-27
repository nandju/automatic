"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, History } from "lucide-react"

interface VerificationResult {
  date: string
  codeSouche: string
  codeBagage: string
  conforme: boolean
}

export default function ResultatPage() {
  const [codeSouche, setCodeSouche] = useState<string | null>(null)
  const [codeBagage, setCodeBagage] = useState<string | null>(null)
  const [isConforme, setIsConforme] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    // Récupérer les codes
    const souche = localStorage.getItem("codeSouche")
    const bagage = localStorage.getItem("codeBagage")

    if (!souche || !bagage) {
      router.push("/scan-souche")
      return
    }

    setCodeSouche(souche)
    setCodeBagage(bagage)

    // Comparer les codes
    const conforme = souche === bagage
    setIsConforme(conforme)

    // Sauvegarder dans l'historique
    const historique: VerificationResult[] = JSON.parse(
      localStorage.getItem("historique") || "[]"
    )

    const nouvelleVerification: VerificationResult = {
      date: new Date().toISOString(),
      codeSouche: souche,
      codeBagage: bagage,
      conforme: conforme,
    }

    historique.unshift(nouvelleVerification)
    // Garder seulement les 100 dernières vérifications
    const historiqueLimite = historique.slice(0, 100)
    localStorage.setItem("historique", JSON.stringify(historiqueLimite))
  }, [router])

  const handleNewScan = () => {
    // Vider le localStorage des codes
    localStorage.removeItem("codeSouche")
    localStorage.removeItem("codeBagage")
    router.push("/scan-souche")
  }

  const handleBack = () => {
    router.push("/scan-bagage")
  }

  const handleGoToHistory = () => {
    router.push("/historique")
  }

  if (isConforme === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-foreground">Résultat de la vérification</h1>
        </div>

        {/* Résultat */}
        <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-[#2a2a2a]">
          {/* Statut */}
          <div className="text-center mb-8">
            {isConforme ? (
              <div>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                  <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ✔ Conforme
                </h2>
                <p className="text-muted-foreground">
                  Les codes de la souche et du bagage correspondent
                </p>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
                  <XCircle className="w-16 h-16 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                  ❌ Non conforme
                </h2>
                <p className="text-muted-foreground">
                  Les codes de la souche et du bagage ne correspondent pas
                </p>
              </div>
            )}
          </div>

          {/* Codes */}
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Code souche :</p>
              <p className="font-mono text-lg font-semibold break-all">{codeSouche}</p>
            </div>
            <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Code bagage :</p>
              <p className="font-mono text-lg font-semibold break-all">{codeBagage}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleNewScan}
              className="flex-1 bg-[#7a7fee] hover:bg-[#6a6fde] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Nouveau scan
            </button>
            <button
              onClick={handleGoToHistory}
              className="flex-1 bg-gray-100 dark:bg-[#2a2a2a] hover:bg-gray-200 dark:hover:bg-[#3a3a3a] text-foreground font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <History className="w-5 h-5" />
              Historique
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

