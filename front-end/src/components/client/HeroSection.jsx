import React, { useState, useContext } from "react";
import { Search, MapPin, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ImmobilierContext } from "../../context/ImmobilierContext";

function HeroSection() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const { immobilier } = useContext(ImmobilierContext);

  // Filtrer les biens selon le titre ou la ville
  const filteredImmobilier = immobilier.filter(
    (item) =>
      item.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ville.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="accueil" className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            {t("hero.title")}
            <br />
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {t("hero.brand")}
            </span>
          </h2>

          <p className="text-xl text-gray-600">{t("hero.subtitle")}</p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("hero.placeholder")}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <button
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Search size={20} />
              {t("hero.search")}
            </button>
          </div>

          {/* Filtered Results with Images */}
          {searchQuery && filteredImmobilier.length > 0 && (
            <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
              {filteredImmobilier.map((item) => (
                <Link
                  key={item.id}
                  to={`/immobilier/${item.id}/information`}
                  className="group flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow hover:shadow-xl hover:border-cyan-500 transition-all duration-300 hover:bg-orange-50"
                >
                  {/* Image */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={`http://localhost:8000/storage/${item.image_principale}`}
                      alt={item.titre}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg group-hover:shadow-md transition"
                    />
                    <div className="absolute top-2 right-2 bg-cyan-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                      <Home size={12} className="inline mr-1" />
                      {item.type}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-cyan-600 transition line-clamp-2">
                      {item.titre}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1 mb-2">
                      <MapPin size={16} className="text-cyan-600" />
                      <span>{item.ville}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-cyan-600">
                        {item.prix.toLocaleString()} MAD
                      </span>
                      {item.surface && (
                        <span className="text-sm text-gray-500">
                          • {item.surface} m²
                        </span>
                      )}
                    </div>

                    <div className="mt-3 inline-block px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full group-hover:bg-cyan-600 group-hover:text-white transition">
                      Voir plus →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchQuery && filteredImmobilier.length === 0 && (
            <div className="mt-4 p-6 bg-orange-50 border border-orange-200 rounded-lg text-center">
              <Search className="mx-auto mb-2 text-gray-400" size={32} />
              <p className="text-gray-600 font-medium">Aucun bien trouvé.</p>
              <p className="text-sm text-gray-500">Essayez avec d'autres critères de recherche</p>
            </div>
          )}
        </div>

        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
              alt={t("hero.image_alt")}
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl -z-10 opacity-20 blur-xl"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;