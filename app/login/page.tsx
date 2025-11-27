"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation simple
    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    // Simulation de connexion (à remplacer par une vraie authentification)
    // Pour l'instant, on accepte n'importe quel email/password
    localStorage.setItem("isAuthenticated", "true")
    localStorage.setItem("userEmail", email)
    router.push("/scan-souche")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7a7fee]/10 via-white to-[#7a7fee]/5 dark:from-[#101112] dark:via-[#101112] dark:to-[#272829] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-[#272829] rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-[#2a2a2a]">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <Image
                src="/automatic-favicon-no-bg.png"
                alt="Automatic Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-center mb-2 text-[#7a7fee]">
            Automatic
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Vérification automatique bagage / souche
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7a7fee] focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2 text-foreground"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#7a7fee] focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7a7fee] hover:bg-[#6a6fde] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7a7fee] focus:ring-offset-2"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

