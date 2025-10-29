import React from "react";
import { useTranslation } from "react-i18next";

function HowItWork() {
  const { t } = useTranslation();

  const steps = [
    { step: "1", title: t("howitworks.steps.search.title"), desc: t("howitworks.steps.search.desc") },
    { step: "2", title: t("howitworks.steps.visit.title"), desc: t("howitworks.steps.visit.desc") },
    { step: "3", title: t("howitworks.steps.negotiate.title"), desc: t("howitworks.steps.negotiate.desc") },
    { step: "4", title: t("howitworks.steps.movein.title"), desc: t("howitworks.steps.movein.desc") },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900">{t("howitworks.title")}</h3>
          <p className="mt-4 text-xl text-gray-600">{t("howitworks.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold shadow-lg">
                {item.step}
              </div>
              <h4 className="mt-6 text-xl font-bold text-gray-900">{item.title}</h4>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
