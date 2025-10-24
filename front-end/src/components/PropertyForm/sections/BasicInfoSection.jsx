import React from 'react';
import { FormInput, FormSelect, FormTextarea } from '../index';

export const BasicInfoSection = ({ formData, errors, touched, handlers, t }) => {
  const typeOptions = [
    { value: 'appartement', label: t('properties.types.appartement') },
    { value: 'maison', label: t('properties.types.maison') },
    { value: 'villa', label: t('properties.types.villa') },
    { value: 'studio', label: t('properties.types.studio') },
    { value: 'terrain', label: t('properties.types.terrain') },
    { value: 'bureau', label: t('properties.types.bureau') },
    { value: 'commerce', label: t('properties.types.commerce') }
  ];

  const transactionOptions = [
    { value: 'vente', label: t('properties.transactions.vente') },
    { value: 'location', label: t('properties.transactions.location') }
  ];

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties.sections.basicInfo')}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <FormInput
            label={t('properties.fields.titre')}
            name="titre"
            value={formData.titre}
            onChange={handlers.handleInputChange}
            onBlur={handlers.handleBlur}
            error={errors.titre}
            touched={touched.titre}
            required
          />
        </div>

        <div className="md:col-span-2">
          <FormTextarea
            label={t('properties.fields.description')}
            name="description"
            value={formData.description}
            onChange={handlers.handleInputChange}
            onBlur={handlers.handleBlur}
            error={errors.description}
            touched={touched.description}
          />
        </div>

        <FormSelect
          label={t('properties.fields.type')}
          name="type"
          value={formData.type}
          onChange={handlers.handleInputChange}
          options={typeOptions}
          required
        />

        <FormSelect
          label={t('properties.fields.transaction')}
          name="transaction"
          value={formData.transaction}
          onChange={handlers.handleInputChange}
          options={transactionOptions}
          required
        />

        <FormInput
          label={t('properties.fields.prix')}
          name="prix"
          type="number"
          value={formData.prix}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.prix}
          touched={touched.prix}
          step="0.01"
          required
        />

        <FormInput
          label={t('properties.fields.surface')}
          name="surface"
          type="number"
          value={formData.surface}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.surface}
          touched={touched.surface}
          step="0.01"
          required
        />
      </div>
    </div>
  );
};