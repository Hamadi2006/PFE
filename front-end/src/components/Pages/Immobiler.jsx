import HeroFilter from "../client/HeroFilter";
import LeftFilter from "../client/LeftFilter";
import Results from "../client/Results";
import useImmobilierPageData from "./immobilier/useImmobilierPageData";

export default function Immobilier() {
  const { filteredImmobilier } = useImmobilierPageData();

  return (
    <div>
      <HeroFilter />

      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <LeftFilter />
            <Results immobilier={filteredImmobilier} />
          </div>
        </div>
      </section>
    </div>
  );
}
