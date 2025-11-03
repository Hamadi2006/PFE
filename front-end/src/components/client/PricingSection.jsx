import React from "react";

// Single pricing card component
const PricingCard = ({ title, price, priceDesc, features, isPopular }) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-8 flex flex-col justify-between transition-transform duration-300 ${
        isPopular ? "border-2 border-cyan-600 scale-105" : ""
      }`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-3xl font-extrabold text-gray-900 mt-2">{price}</p>
        {priceDesc && <p className="text-gray-500 mt-1">{priceDesc}</p>}
      </div>
      <ul className="mb-6 space-y-2">
        {features?.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-600">
            <span className="text-cyan-600">✔️</span>
            {feature}
          </li>
        ))}
      </ul>
      <button
        className={`mt-auto px-6 py-3 rounded-lg font-semibold text-white ${
          isPopular ? "bg-cyan-600 hover:bg-cyan-700" : "bg-gray-800 hover:bg-gray-900"
        } transition`}
      >
        Choisir
      </button>
    </div>
  );
};

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Vente",
      price: "3%",
      priceDesc: "Du prix de vente",
      features: ["Diffusion multicanal", "Accompagnement complet"],
    },
    {
      title: "Location",
      price: "8%",
      priceDesc: "Du loyer annuel HT",
      features: ["Sélection locataires", "Rédaction du bail", "État des lieux", "Gestion des loyers"],
      isPopular: true,
    },
    {
      title: "Gestion",
      price: "6%",
      priceDesc: "Du loyer mensuel HT",
      features: ["Tout service location", "Suivi des paiements", "Gestion travaux", "Reporting mensuel"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Nos Tarifs Transparents</h2>
          <p className="mt-4 text-gray-600 text-lg">Des honoraires clairs et compétitifs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
        <p className="text-center mt-8 text-gray-600">
          * Estimation gratuite et sans engagement | Tarifs dégressifs selon valeur du bien
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
