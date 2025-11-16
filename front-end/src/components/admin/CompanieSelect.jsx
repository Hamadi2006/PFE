import React from 'react';
import { useTranslation } from 'react-i18next';

export const CompanieSelect = ({ companies = [], getSocieteId }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {t('properties2.fields.company')}
      </label>

      <select
        name="societe_id"
        className="border rounded p-2 w-full"
        onChange={(e) => getSocieteId(e.target.value)}
      >
        <option value="">Sélectionner une société</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.nom}
          </option>
        ))}
      </select>
    </div>
  );
};
