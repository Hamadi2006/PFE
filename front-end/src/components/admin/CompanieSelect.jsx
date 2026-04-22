import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputError } from '../PropertyForm/InputError';

export const CompanieSelect = ({
  companies = [],
  value = '',
  error,
  touched,
  getSocieteId,
  onBlur,
  disabled = false,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {t('properties2.fields.company')} <span className="text-red-500">*</span>
      </label>

      <select
        name="societe_id"
        value={value}
        disabled={disabled || companies.length === 0}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error && touched ? 'border-red-500' : 'border-slate-300'
        }`}
        onChange={(e) => getSocieteId(e.target.value)}
      >
        <option value="">
          {companies.length === 0
            ? 'Aucune societe disponible'
            : 'Selectionner une societe'}
        </option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.nom}
          </option>
        ))}
      </select>
      <InputError error={touched && error} />
    </div>
  );
};
