import { Award, Users, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const reasons = t("whyChooseUs.reasons", { returnObjects: true });

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("whyChooseUs.title")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            {t("whyChooseUs.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-cyan-600 bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="text-cyan-600 text-3xl" />
                </div>
                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  {reason.title}
                </h3>
                <p className="mt-2 text-gray-600">{reason.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
