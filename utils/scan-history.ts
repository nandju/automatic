// Types pour l'historique des scans
export interface ScanRecord {
  date: string
  type: "souche" | "bagage"
  code: string
  id: string // Identifiant unique pour chaque scan
}

export interface VerificationResult {
  date: string
  codeSouche: string
  codeBagage: string
  conforme: boolean
}

// Clés localStorage
const SCAN_HISTORY_KEY = "scanHistory"
const VERIFICATION_HISTORY_KEY = "historique"

// Enregistrer un scan individuel
export function saveScanRecord(type: "souche" | "bagage", code: string): void {
  if (typeof window === "undefined") return

  const scanRecord: ScanRecord = {
    date: new Date().toISOString(),
    type,
    code,
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  }

  const history: ScanRecord[] = JSON.parse(
    localStorage.getItem(SCAN_HISTORY_KEY) || "[]"
  )

  history.unshift(scanRecord)
  // Garder seulement les 500 derniers scans
  const limitedHistory = history.slice(0, 500)
  localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(limitedHistory))
}

// Récupérer l'historique des scans
export function getScanHistory(): ScanRecord[] {
  if (typeof window === "undefined") return []

  return JSON.parse(localStorage.getItem(SCAN_HISTORY_KEY) || "[]")
}

// Récupérer l'historique des vérifications complètes
export function getVerificationHistory(): VerificationResult[] {
  if (typeof window === "undefined") return []

  return JSON.parse(localStorage.getItem(VERIFICATION_HISTORY_KEY) || "[]")
}

// Enregistrer une vérification complète
export function saveVerification(
  codeSouche: string,
  codeBagage: string
): VerificationResult {
  if (typeof window === "undefined") {
    return {
      date: new Date().toISOString(),
      codeSouche,
      codeBagage,
      conforme: false,
    }
  }

  const conforme = codeSouche === codeBagage

  const verification: VerificationResult = {
    date: new Date().toISOString(),
    codeSouche,
    codeBagage,
    conforme,
  }

  const history: VerificationResult[] = JSON.parse(
    localStorage.getItem(VERIFICATION_HISTORY_KEY) || "[]"
  )

  history.unshift(verification)
  // Garder seulement les 100 dernières vérifications
  const limitedHistory = history.slice(0, 100)
  localStorage.setItem(VERIFICATION_HISTORY_KEY, JSON.stringify(limitedHistory))

  return verification
}

// Supprimer l'historique des scans
export function clearScanHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(SCAN_HISTORY_KEY)
}

// Supprimer l'historique des vérifications
export function clearVerificationHistory(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(VERIFICATION_HISTORY_KEY)
}

// Supprimer tout l'historique
export function clearAllHistory(): void {
  clearScanHistory()
  clearVerificationHistory()
}

