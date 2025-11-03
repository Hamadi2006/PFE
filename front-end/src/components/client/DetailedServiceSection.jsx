import React from "react";
import { CheckCircle, Lightbulb, Rocket, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-4 group">
    <div className="text-cyan-600 mt-1 group-hover:scale-110 transition-transform duration-200">
      <Icon size={26} />
    </div>
    <div>
      <h4 className="font-semibold text-gray-800 group-hover:text-cyan-700">
        {title}
      </h4>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const DetailedServiceSection = ({
  title,
  subtitle,
  description,
  features = [],
  image,
  reverse = false,
}) => {
  const { t } = useTranslation();

  const featureIcons = [CheckCircle, Lightbulb, Rocket, Shield];

  return (
    <section className={`py-20 ${reverse ? "bg-orange-50" : "bg-white"}`}>
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center gap-12`}
        >
          {image && (
            <div className="lg:w-1/2">
              <img
                src={image}
                alt={title}
                className="rounded-2xl shadow-2xl w-full h-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="lg:w-1/2">
            {subtitle && (
              <span className="inline-block px-4 py-2 bg-cyan-600/10 text-cyan-700 rounded-full text-sm font-semibold mb-4">
                {t(subtitle)}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {t(title)}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 text-lg mb-8">{t(description)}</p>
            )}

            {features.length > 0 && (
              <div className="space-y-5">
                {features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    icon={feature.icon || featureIcons[index % featureIcons.length]}
                    title={t(feature.title)}
                    description={t(feature.description)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedServiceSection;
