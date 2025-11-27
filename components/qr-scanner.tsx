"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void
  onScanFailure?: (error: string) => void
  title?: string
  description?: string
}

export default function QRScanner({
  onScanSuccess,
  onScanFailure,
  title = "Scanner QR Code",
  description = "Positionnez le QR code dans le cadre",
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const startScanning = async () => {
      try {
        const html5QrCode = new Html5Qrcode("qr-reader")
        scannerRef.current = html5QrCode

        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            setScannedCode(decodedText)
            onScanSuccess(decodedText)
            stopScanning()
          },
          (errorMessage) => {
            // Ignore les erreurs de scan continu
            if (onScanFailure) {
              onScanFailure(errorMessage)
            }
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
    }

    startScanning()

    return () => {
      stopScanning()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div
        ref={containerRef}
        id="qr-reader"
        className="w-full rounded-lg overflow-hidden bg-black"
        style={{ minHeight: "300px" }}
      />

      {scannedCode && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm font-medium text-green-800 dark:text-green-200">
            Code scanné : <span className="font-mono">{scannedCode}</span>
          </p>
        </div>
      )}
    </div>
  )
}

