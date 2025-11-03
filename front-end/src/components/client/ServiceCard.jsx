export default function ServiceCard({ icon, title, description, buttonText }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center hover:shadow-md transition">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition">
        {buttonText}
      </button>
    </div>
  );
}
