import React from "react";
import { useTranslation } from "react-i18next";

const HeroSectionS = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gradient-to-br from-cyan-600 to-cyan-400 py-20 text-white">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          {t("services_hero.title")}
        </h1>
        <p className="mt-6 text-xl opacity-90 max-w-3xl mx-auto">
          {t("services_hero.subtitle")}
        </p>
      </div>
    </section>
  );
};

export default HeroSectionS;
