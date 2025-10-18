import React from "react";
import { Search, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

function CTA() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          <h3 className="text-4xl md:text-5xl font-bold">
            {t("cta.title")}
          </h3>
          <p className="mt-6 text-xl opacity-90">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 inline-flex items-center justify-center gap-2">
              <Search size={20} />
              {t("cta.browse")}
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-cyan-600 transition-all duration-200 inline-flex items-center justify-center gap-2">
              <TrendingUp size={20} />
              {t("cta.estimate")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
