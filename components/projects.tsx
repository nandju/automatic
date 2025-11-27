"use client"

import Link from "next/link"
import { QrCode, Package, CheckCircle2 } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Scanner la souche",
    description: "Scannez le QR code de la souche (ticket) pour commencer la vérification.",
    icon: QrCode,
  },
  {
    id: 2,
    title: "Scanner le bagage",
    description: "Scannez ensuite le QR code du bagage à vérifier.",
    icon: Package,
  },
  {
    id: 3,
    title: "Résultat instantané",
    description: "Obtenez immédiatement le résultat : conforme ou non conforme.",
    icon: CheckCircle2,
  },
]

export default function Projects() {

  return (
    <section id="projects" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Comment ça
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Fonctionne</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Processus simple en trois étapes : scannez la souche, scannez le bagage, et obtenez instantanément le résultat de la vérification.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => (
          <div
            key={step.id}
            className="card overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
          >
            <div className="p-6 md:p-8">
              <div className="bg-[#7A7FEE] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-[#7A7FEE] mr-2">{step.id}</span>
                <h3 className="text-xl font-semibold text-black dark:text-white">{step.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Link href="/login" className="btn-primary">
          Commencer une vérification
        </Link>
      </div>
    </section>
  )
}
