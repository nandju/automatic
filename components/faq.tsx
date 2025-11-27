"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    id: 1,
    question: "Comment utiliser la plateforme Automatic ?",
    answer:
      "Connectez-vous à votre compte, puis scannez d'abord le QR code de la souche (ticket), ensuite scannez le QR code du bagage. La plateforme comparera automatiquement les deux codes et affichera le résultat.",
  },
  {
    id: 2,
    question: "Puis-je consulter l'historique de mes vérifications ?",
    answer:
      "Oui, toutes vos vérifications sont enregistrées automatiquement dans l'historique. Vous pouvez y accéder à tout moment pour consulter les détails de chaque vérification, y compris la date, l'heure et le statut (conforme ou non conforme).",
  },
  {
    id: 3,
    question: "La plateforme fonctionne-t-elle sur mobile ?",
    answer:
      "Oui, Automatic est une Progressive Web App (PWA) optimisée pour mobile. Vous pouvez l'utiliser directement depuis votre navigateur mobile ou l'installer comme une application.",
  },
  {
    id: 4,
    question: "Que signifie 'Conforme' ou 'Non conforme' ?",
    answer:
      "Conforme signifie que les codes de la souche et du bagage correspondent exactement. Non conforme signifie qu'ils sont différents, indiquant une possible erreur dans l'association du bagage à la souche.",
  },
  {
    id: 5,
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Oui, toutes les données sont stockées localement sur votre appareil. Aucune information n'est transmise à des serveurs externes, garantissant la confidentialité de vos vérifications.",
  },
  {
    id: 6,
    question: "Puis-je utiliser la plateforme hors ligne ?",
    answer:
      "Oui, une fois la page chargée, vous pouvez utiliser Automatic sans connexion internet. Toutes les fonctionnalités de scan et de vérification fonctionnent en mode hors ligne.",
  },
]

export default function Faq() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  return (
    <section id="faq" className="my-20">
      <div className="card p-8 md:p-10 shadow-lg">
        <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
          Questions
          <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Fréquentes</span>
        </h2>
        <p className="mb-8 max-w-2xl text-gray-700 dark:text-gray-300">
          Vous avez des questions sur la plateforme Automatic ? Trouvez les réponses aux questions les plus courantes et découvrez comment utiliser efficacement notre système de vérification.
        </p>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-b pb-4 border-gray-300 dark:border-gray-700">
              <button
                onClick={() => toggleItem(faq.id)}
                className="flex justify-between items-center w-full text-left py-2 font-medium text-black dark:text-white hover:text-[#7A7FEE] dark:hover:text-[#7A7FEE] transition-colors"
                aria-expanded={openItem === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${openItem === faq.id ? "rotate-180 text-[#7A7FEE]" : ""}`}
                />
              </button>
              {openItem === faq.id && (
                <div id={`faq-answer-${faq.id}`} className="mt-2 text-gray-700 dark:text-gray-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
