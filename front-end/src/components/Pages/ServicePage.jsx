import { useTranslation } from "react-i18next";
import { Home, DollarSign, ClipboardCheck, Shield, Key, FileText, Wrench } from "lucide-react";

import AdditionalServices from "../client/AdditionalServices";
import CTASection from "../client/CTASection";
import DetailedServiceSection from "../client/DetailedServiceSection";
import EstimationForm from "../client/EstimationForm";
import FAQ from "../client/FAQItem";
import MainServices from "../client/MainServices";
import PricingSection from "../client/PricingSection";
import WhatsAppButton from "../client/WhatsAppButton";
import WhyChooseUs from "../client/WhyChooseUs";
import HeroSectionS from "../client/HeroSectionS";
import TestimonialCardS from "../client/TestimonialCardS";

const ServicePage = () => {
  const { t } = useTranslation();

  const venteFeatures = [
    {
      icon: Home,
      title: t("vente_feature1_title"),
      description: t("vente_feature1_description"),
    },
    {
      icon: DollarSign,
      title: t("vente_feature2_title"),
      description: t("vente_feature2_description"),
    },
    {
      icon: ClipboardCheck,
      title: t("vente_feature3_title"),
      description: t("vente_feature3_description"),
    },
    {
      icon: Shield,
      title: t("vente_feature4_title"),
      description: t("vente_feature4_description"),
    },
  ];

  const locationFeatures = [
    {
      icon: Key,
      title: t("location_feature1_title"),
      description: t("location_feature1_description"),
    },
    {
      icon: FileText,
      title: t("location_feature2_title"),
      description: t("location_feature2_description"),
    },
    {
      icon: DollarSign,
      title: t("location_feature3_title"),
      description: t("location_feature3_description"),
    },
    {
      icon: Wrench,
      title: t("location_feature4_title"),
      description: t("location_feature4_description"),
    },
  ];

  return (
    <div className="bg-orange-50 min-h-screen">
      <HeroSectionS />
      <MainServices />

      <DetailedServiceSection
        title={t("vente_title")}
        subtitle={t("vente_subtitle")}
        description={t("vente_description")}
        features={venteFeatures}
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
        reverse={false}
      />

      <DetailedServiceSection
        title={t("location_title")}
        subtitle={t("location_subtitle")}
        description={t("location_description")}
        features={locationFeatures}
        image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop"
        reverse={true}
      />

      <EstimationForm />
      <WhyChooseUs />
      <FAQ />
      <WhatsAppButton />
    </div>
  );
};

export default ServicePage;
