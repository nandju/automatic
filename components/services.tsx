import { CircleDot, Layers, Rocket } from "lucide-react"

const services = [
  {
    id: 1,
    title: "Scan QR Code",
    description: "Scannez rapidement les QR codes des souches et des bagages avec votre appareil mobile.",
    icon: CircleDot,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 2,
    title: "Vérification Automatique",
    description: "Comparaison automatique des codes pour vérifier la conformité en temps réel.",
    icon: Layers,
    color: "bg-[#7A7FEE]",
  },
  {
    id: 3,
    title: "Historique Complet",
    description: "Consultez l'historique de toutes vos vérifications pour un suivi optimal.",
    icon: Rocket,
    color: "bg-[#7A7FEE]",
  },
]

export default function Services() {
  return (
    <section id="services" className="my-20">
      <h2 className="text-black dark:text-white mb-6 text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
        Fonctionnalités
        <span className="block text-[#7A7FEE] dark:text-[#7A7FEE]">Principales</span>
      </h2>
      <p className="mb-12 max-w-2xl text-gray-700 dark:text-gray-300">
        Une plateforme simple et efficace pour vérifier la conformité des bagages. Scannez, comparez et consultez l'historique de toutes vos vérifications en quelques clics.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="card p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className={`${service.color} w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm`}>
              <service.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">{service.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
