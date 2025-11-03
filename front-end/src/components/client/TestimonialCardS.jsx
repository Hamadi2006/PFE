const TestimonialCardS = ({ rating, text, name, role, initials }) => {
  return (
    <div className="bg-orange-50 p-8 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="text-cyan-600 text-xl">{'★'.repeat(rating)}</div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
      <div className="mt-6 flex items-center">
        <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
          {initials}
        </div>
        <div className="ml-4">
          <h5 className="font-bold text-gray-800">{name}</h5>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      rating: 5,
      text: "Service d'estimation très professionnel. J'ai vendu ma villa à Marrakech en moins de 3 semaines grâce à leur expertise. Équipe réactive et compétente!",
      name: "Karim Mansouri",
      role: "Propriétaire - Marrakech",
      initials: "KM"
    },
    {
      rating: 5,
      text: "Excellent service de gestion locative. Ils s'occupent de tout et je reçois mes loyers à temps chaque mois. Je recommande vivement SakanCom.",
      name: "Nadia El Amrani",
      role: "Investisseuse - Casablanca",
      initials: "NE"
    },
    {
      rating: 5,
      text: "Accompagnement exceptionnel pour l'achat de notre premier appartement. Conseils précieux et négociation au top. Merci à toute l'équipe!",
      name: "Youssef Bennani",
      role: "Acheteur - Rabat",
      initials: "YB"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Témoignages Clients</h2>
          <p className="mt-4 text-gray-600 text-lg">Ce que nos clients disent de nos services</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCardS;
