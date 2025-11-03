import { Award, Users, ShieldCheck, Zap } from "lucide-react";

const WhyChooseUs = () => {
  const iconMap = {
    Award: Award,
    Users: Users,
    ShieldCheck: ShieldCheck,
    Zap: Zap
  };

  const reasons = [
    {
      iconName: "Award",
      title: "Excellence",
      desc: "Nous offrons les meilleurs services et produits de qualité supérieure"
    },
    {
      iconName: "Users",
      title: "Équipe Professionnelle",
      desc: "Notre équipe est composée d'experts expérimentés et dédiés"
    },
    {
      iconName: "ShieldCheck",
      title: "Sécurité Garantie",
      desc: "Vos données et votre confiance sont notre priorité absolue"
    },
    {
      iconName: "Zap",
      title: "Performance",
      desc: "Vitesse, efficacité et résultats optimaux garantis"
    }
  ];

  return (
    <section className="py-20 bg-orange-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Pourquoi nous choisir ?
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Découvrez les raisons pour lesquelles nos clients nous font confiance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.iconName];
            return (
              <div 
                key={index} 
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-black-600 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-30 transition-all">
                  <Icon size={40} className="text-cyan-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;