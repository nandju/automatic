"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void
  onScanFailure?: (error: string) => void
  title?: string
  description?: string
  allowMultipleScans?: boolean
  resetScan?: boolean
}

export default function QRScanner({
  onScanSuccess,
  onScanFailure,
  title = "Scanner QR Code / Code-barres",
  description = "Positionnez le QR code ou code-barres dans le cadre",
  allowMultipleScans = true,
  resetScan = false,
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Réinitialiser le code scanné si resetScan change
  useEffect(() => {
    if (resetScan) {
      setScannedCode(null)
      setLastScannedCode(null)
    }
  }, [resetScan])

  useEffect(() => {
    const startScanning = async () => {
      try {
        // Activer le scan des QR codes ET des codes-barres
        const formatsToSupport = [
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.CODE_93,
          Html5QrcodeSupportedFormats.CODABAR,
          Html5QrcodeSupportedFormats.ITF,
          Html5QrcodeSupportedFormats.DATA_MATRIX,
          Html5QrcodeSupportedFormats.AZTEC,
        ]

        const html5QrCode = new Html5Qrcode("qr-reader", {
          formatsToSupport: formatsToSupport,
        })
        scannerRef.current = html5QrCode

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText, decodedResult) => {
            // Éviter les scans multiples du même code en peu de temps
            if (scanTimeoutRef.current) {
              clearTimeout(scanTimeoutRef.current)
            }

            // Si c'est le même code que le dernier, ignorer
            if (decodedText === lastScannedCode) {
              return
            }

            setLastScannedCode(decodedText)
            setScannedCode(decodedText)
            onScanSuccess(decodedText)

            // Si on ne permet pas plusieurs scans, arrêter le scanner
            if (!allowMultipleScans) {
              stopScanning()
            } else {
              // Réinitialiser après 2 secondes pour permettre un nouveau scan
              scanTimeoutRef.current = setTimeout(() => {
                setScannedCode(null)
              }, 2000)
            }
          },
          (errorMessage) => {
            // Ignore les erreurs de scan continu (normal pendant le scan)
            // Ne pas appeler onScanFailure pour les erreurs de scan continu
          }
        )
        setIsScanning(true)
      } catch (err) {
        console.error("Erreur lors du démarrage du scanner:", err)
        if (onScanFailure) {
          onScanFailure("Impossible de démarrer la caméra")
        }
      }
    }

    const stopScanning = async () => {
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop()
          scannerRef.current.clear()
          setIsScanning(false)
        } catch (err) {
          console.error("Erreur lors de l'arrêt du scanner:", err)
        }
      }
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current)
      }
    }

    startScanning()

    return () => {
      stopScanning()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowMultipleScans, lastScannedCode])


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Supporte QR codes et codes-barres • Scans multiples autorisés
        </p>
      </div>
      
      <div
        ref={containerRef}
        id="qr-reader"
        className="w-full rounded-lg overflow-hidden bg-black"
        style={{ minHeight: "300px" }}
      />

      {scannedCode && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-pulse">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Code scanné : <span className="font-mono">{scannedCode}</span>
          </p>
          {allowMultipleScans && (
            <p className="text-xs text-green-700 dark:text-green-300 mt-2">
              Vous pouvez scanner un autre code
            </p>
          )}
        </div>
      )}
    </div>
  )
}

