import React, { useState } from "react";
import { Plus, X, Eye, Edit, Trash2 } from "lucide-react";
import AddCompanyModal from "./AddCompanyModal";
import CompaniesTable from "./CompaniesTable";

export default function CompaniesPage() {
  const [showModal, setShowModal] = useState(false);
  const [companies, setCompanies] = useState([
    { nom: "Société Alpha", email: "alpha@societe.com", telephone: "0600000001", ville: "Rabat" },
    { nom: "Société Beta", email: "beta@societe.com", telephone: "0600000002", ville: "Casablanca" },
  ]);

  const handleAddCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Sociétés Partenaires</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition text-sm md:text-base"
        >
          <Plus size={18} />
          Ajouter une société
        </button>
      </div>

      <CompaniesTable companies={companies} />

      <AddCompanyModal showModal={showModal} setShowModal={setShowModal} onAdd={handleAddCompany} />
    </div>
  );
}