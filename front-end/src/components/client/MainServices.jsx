import { Tag, Key, BarChart3, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import ServiceCard from "./ServiceCard";

const MainServices = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Tag className="w-10 h-10 text-cyan-600" />,
      title: t("main_services.sale.title"),
      description: t("main_services.sale.description"),
      buttonText: t("main_services.sale.button")
    },
    {
      icon: <Key className="w-10 h-10 text-cyan-600" />,
      title: t("main_services.rent.title"),
      description: t("main_services.rent.description"),
      buttonText: t("main_services.rent.button")
    },
    {
      icon: <BarChart3 className="w-10 h-10 text-cyan-600" />,
      title: t("main_services.estimate.title"),
      description: t("main_services.estimate.description"),
      buttonText: t("main_services.estimate.button")
    },
    {
      icon: <User className="w-10 h-10 text-cyan-600" />,
      title: t("main_services.advice.title"),
      description: t("main_services.advice.description"),
      buttonText: t("main_services.advice.button")
    }
  ];

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainServices;
