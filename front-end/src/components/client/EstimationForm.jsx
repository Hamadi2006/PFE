import React, { useState } from "react";
import { Send, Home, FileText, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const EstimationForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    propertyType: "Villa",
    city: "Casablanca",
    surface: "",
    bedrooms: "",
    bathrooms: "",
    fullName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const steps = [
    { icon: Home, title: t("steps.fillForm.title"), desc: t("steps.fillForm.desc") },
    { icon: FileText, title: t("steps.analysis.title"), desc: t("steps.analysis.desc") },
    { icon: CheckCircle, title: t("steps.receive.title"), desc: t("steps.receive.desc") },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-cyan-600 bg-opacity-10 text-white-600 rounded-full text-sm font-semibold mb-4">
            {t("header.subtitle")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {t("header.title")}
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            {t("header.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 bg-cyan-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                <item.icon size={32} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-800">
                {item.title}
              </h3>
              <p className="mt-3 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-orange-50 p-8 rounded-lg shadow-xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {t("form.title")}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.propertyType")}
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                >
                  <option>Villa</option>
                  <option>Appartement</option>
                  <option>Riad</option>
                  <option>Terrain</option>
                  <option>Bureau</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.city")}
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                >
                  <option>Casablanca</option>
                  <option>Rabat</option>
                  <option>Marrakech</option>
                  <option>Fès</option>
                  <option>Tanger</option>
                  <option>Agadir</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.surface")}
                </label>
                <input
                  type="number"
                  name="surface"
                  placeholder="120"
                  value={formData.surface}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.bedrooms")}
                </label>
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="3"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.bathrooms")}
                </label>
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="2"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.fullName")}
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t("form.placeholder.name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800">
                  {t("form.phone")}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+212 6XX XXX XXX"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-800">
                {t("form.email")}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-4 rounded-lg font-bold hover:bg-opacity-90 flex items-center justify-center"
            >
              <Send className="mr-2" />
              {t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EstimationForm;
