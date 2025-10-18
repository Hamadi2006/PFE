import React from "react";
import { useTranslation } from "react-i18next";

function StatistiquesSection() {
  const { t } = useTranslation();

  const stats = [
    { value: "5000+", label: t("stats.sold_properties") },
    { value: "3200+", label: t("stats.happy_clients") },
    { value: "15+", label: t("stats.years_experience") },
    { value: "50+", label: t("stats.cities_covered") }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="transform hover:scale-110 transition-transform duration-300 cursor-pointer"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="mt-2 text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatistiquesSection;
