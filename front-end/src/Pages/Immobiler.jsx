import HeroFilter from "../components/HeroFilter";
import LeftFilter from "../components/LeftFilter";
import Results from "../components/Results";

export default function Immobilier() {
    return (
        <div>
            {/* Hero Section avec filtres de recherche */}
            <HeroFilter />
            
            {/* Section principale avec filtres à gauche et résultats à droite */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Filtres à gauche - 25% */}
                        <LeftFilter />
                        
                        {/* Résultats à droite - 75% */}
                        <Results />
                    </div>
                </div>
            </section>
        </div>
    );
}