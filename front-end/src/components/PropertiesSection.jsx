import React from "react";
import { Bed, Bath, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

function PropertiesSection() {
  const { t } = useTranslation();

  const properties = [
    {
      id: 1,
      title: "Villa de luxe à Marrakech",
      description: "Magnifique villa avec piscine et jardin luxuriant.",
      price: "2 500 000 MAD",
      beds: 4,
      baths: 3,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      badge: "Nouveau"
    },
    {
      id: 2,
      title: "Appartement moderne à Casablanca",
      description: "Appartement ensoleillé avec vue sur l'océan.",
      price: "1 200 000 MAD",
      beds: 2,
      baths: 2,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      badge: null
    },
    {
      id: 3,
      title: "Riad traditionnel à Fès",
      description: "Riad authentique au cœur de la médina historique.",
      price: "980 000 MAD",
      beds: 5,
      baths: 4,
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      badge: "Nouveau"
    }
  ];

  return (
    <section id="immobilier" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900">{t("properties.section_title")}</h3>
          <p className="mt-4 text-xl text-gray-600">{t("properties.section_subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {property.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    {t("properties.badge_new")}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h4 className="text-xl font-bold text-cyan-600">{property.title}</h4>
                <p className="text-gray-600 mt-2">{property.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-gray-500 gap-1">
                      <Bed size={18} />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center text-gray-500 gap-1">
                      <Bath size={18} />
                      <span>{property.baths}</span>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  {t("properties.view_details")}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-cyan-600 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-600 hover:text-white transition-all duration-300 inline-flex items-center gap-2">
            {t("properties.view_all")}
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default PropertiesSection;
