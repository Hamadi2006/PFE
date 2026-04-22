import React from "react";
import { CheckCircle } from "lucide-react";

const PricingCard = ({ icon: Icon, title, price, priceDesc, features, isPopular = false }) => {
  return (
    <div className={`bg-orange-50 p-8 rounded-lg shadow-lg border-2 ${isPopular ? 'border-cyan-600' : 'border-transparent hover:border-cyan-600'} transition relative`}>
      {isPopular && (
        <div className="absolute top-0 right-0 bg-cyan-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
          POPULAIRE
        </div>
      )}
      <div className="text-center">
        {React.createElement(Icon, {
          className: "text-cyan-600 text-5xl mx-auto",
        })}
        <h3 className="mt-4 text-2xl font-bold text-gray-800">{title}</h3>
        <div className="mt-6">
          <span className="text-4xl font-bold text-cyan-600">{price}</span>
          <span className="text-gray-600"> + TVA</span>
        </div>
        <p className="mt-4 text-gray-600">{priceDesc}</p>
      </div>
      <ul className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <CheckCircle className="text-cyan-600 mr-2 text-sm" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`mt-8 w-full px-6 py-3 rounded-lg font-semibold transition ${isPopular ? 'bg-cyan-600 text-white hover:bg-opacity-90' : 'border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'}`}>
        Choisir
      </button>
    </div>
  );
};

export default PricingCard;
