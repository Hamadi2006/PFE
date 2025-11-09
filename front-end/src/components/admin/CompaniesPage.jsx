import React, { useState, useContext } from "react";
import { Plus, Building2, Search } from "lucide-react";
import AddCompanyModal from "./AddCompanyModal";
import CompaniesTable from "./CompaniesTable";
import CompanyInfoModal from "./CompanyInfoModal";
import UpdateCompanyModal from "./UpdateCompanyModal"; // ✅ import manquant
import axios from "axios";
import { CompanyContext } from "../../context/ComapanieContext";
import DeleteCompanyModal from "./DeleteCompanyModal";

export default function CompaniesPage() {
  const [showModal, setShowModal] = useState(false);
  const { companies = [] } = useContext(CompanyContext);
  const [infoCompanyModal, setInfoCompanyModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddCompany = (newCompany) => {
    axios
      .post("http://127.0.0.1:8000/api/company/store", newCompany, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  // 🔍 Filtrer les sociétés
  const filteredCompanies = companies.filter((company) =>
    [company.nom, company.email, company.ville]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      {infoCompanyModal && selectedCompany && (
        <CompanyInfoModal
          company={selectedCompany}
          isOpen={infoCompanyModal}
          onClose={() => setInfoCompanyModal(false)}
        />
      )}

      <div className="min-h-screen p-6 bg-gray-50">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sociétés Partenaires
              </h1>
              <p className="text-gray-600">
                {companies.length} société{companies.length > 1 ? "s" : ""} au
                total
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Nouvelle Société
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 w-full">
                <div className="relative max-w-lg">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher une société par nom, email ou ville..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
                {filteredCompanies.length} résultat
                {filteredCompanies.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Tableau */}
        <CompaniesTable
          companies={filteredCompanies}
          onShowCompany={(company) => {
            setSelectedCompany(company);
            setInfoCompanyModal(true);
          }}
          onUpdateCompany={(company) => {
            setSelectedCompany(company);
            setShowUpdateModal(true);
          }}
          onDeleteCompany={(company) => {
            setSelectedCompany(company);
            setShowDeleteModal(true);
          }}
        />

        {/* Modals */}
        <AddCompanyModal
          showModal={showModal}
          setShowModal={setShowModal}
          onAdd={handleAddCompany}
        />

        {showUpdateModal && (
          <UpdateCompanyModal
            company={selectedCompany}
            isOpen={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            onUpdate={(companyData) => {
              console.log("Données mises à jour:", companyData);
            }}
          />
        )}

        {showDeleteModal && (
          <DeleteCompanyModal
            company={selectedCompany}
            isOpen={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onDelete={(companyData) => {
              console.log("Données supprimées:", companyData);
            }}
          />
        )}
      </div>
    </>
  );
}
