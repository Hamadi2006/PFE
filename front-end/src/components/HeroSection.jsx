import React, { useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

function HeroSection() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");

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
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2">
              <Search size={20} />
              {t("hero.search")}
            </button>
          </div>
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
