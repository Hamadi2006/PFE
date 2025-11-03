import { Hammer, Banknote, Wrench, Home, Camera, Shield } from 'lucide-react';

const AdditionalServices = () => {
  const services = [
    { icon: Hammer, title: "Assistance Juridique", desc: "Accompagnement juridique complet pour toutes vos transactions immobilières" },
    { icon: Banknote, title: "Financement", desc: "Mise en relation avec nos partenaires bancaires pour votre crédit immobilier" },
    { icon: Wrench, title: "Travaux & Rénovation", desc: "Coordination de travaux de rénovation avec nos artisans partenaires" },
    { icon: Home, title: "Home Staging", desc: "Valorisation de votre bien pour une vente plus rapide et au meilleur prix" },
    { icon: Camera, title: "Photographie Pro", desc: "Reportage photo et vidéo professionnels pour sublimer votre propriété" },
    { icon: Shield, title: "Syndic de Copropriété", desc: "Gestion professionnelle de votre copropriété en toute transparence" }
  ];

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Services Complémentaires</h2>
          <p className="mt-4 text-gray-600 text-lg">Des solutions additionnelles pour faciliter votre projet</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <Icon className="text-cyan-600 text-4xl" />
                <h3 className="mt-4 text-xl font-bold text-gray-800">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdditionalServices;