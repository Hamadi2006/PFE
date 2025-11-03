import { CheckCircle } from "lucide-react";

const FeatureItem = ({ title, description }) => {
  return (
    <div className="flex items-start">
      <CheckCircle className="text-cyan-600 mr-4 mt-1" />
      <div>
        <h4 className="font-bold text-gray-800">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;