import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const FAQItem = ({ question, answer }) => {
  return (
    <details className="bg-orange-50 rounded-lg shadow-lg p-6 group">
      <summary className="font-bold text-lg text-gray-800 cursor-pointer flex justify-between items-center">
        {question}
        <ChevronDown className="group-open:rotate-180 transition" />
      </summary>
      <p className="mt-4 text-gray-600">{answer}</p>
    </details>
  );
};

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = t("faq.questions", { returnObjects: true });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("faq.title")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg">{t("faq.subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
