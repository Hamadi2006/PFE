

const CTASection = () => {
  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-br from-cyan-600 to-cyan-400 rounded-2xl p-12 md:p-16 text-center text-white">
          <h3 className="text-3xl md:text-5xl font-bold">Prêt à Démarrer Votre Projet?</h3>
          <p className="mt-6 text-xl opacity-90">Contactez nos experts pour un accompagnement personnalisé</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition flex items-center justify-center">
              DDDD
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-cyan-600 transition">
              Prendre RDV
            </button>
          </div>
          <p className="mt-6 text-sm opacity-75">Disponible 7j/7 de 9h à 20h | Réponse garantie sous 24h</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;