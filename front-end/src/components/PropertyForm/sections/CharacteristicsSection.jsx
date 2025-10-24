import React from 'react';
import { FormInput, FormSelect } from '../index';

export const CharacteristicsSection = ({ formData, errors, touched, handlers, t }) => {
  const statutOptions = [
    { value: 'disponible', label: t('properties.status.disponible') },
    { value: 'reserve', label: t('properties.status.reserve') },
    { value: 'vendu', label: t('properties.status.vendu') },
    { value: 'loue', label: t('properties.status.loue') }
  ];

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties.sections.characteristics')}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label={t('properties.fields.chambres')}
          name="chambres"
          type="number"
          value={formData.chambres}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.chambres}
          touched={touched.chambres}
          min="0"
        />

        <FormInput
          label={t('properties.fields.salles_de_bain')}
          name="salles_de_bain"
          type="number"
          value={formData.salles_de_bain}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.salles_de_bain}
          touched={touched.salles_de_bain}
          min="0"
        />

        <FormInput
          label={t('properties.fields.annee_construction')}
          name="annee_construction"
          type="number"
          value={formData.annee_construction}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.annee_construction}
          touched={touched.annee_construction}
        />

        <FormInput
          label={t('properties.fields.etage')}
          name="etage"
          type="number"
          value={formData.etage}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.etage}
          touched={touched.etage}
        />

        <FormInput
          label={t('properties.fields.nombre_etages')}
          name="nombre_etages"
          type="number"
          value={formData.nombre_etages}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.nombre_etages}
          touched={touched.nombre_etages}
        />

        <FormSelect
          label={t('properties.fields.statut')}
          name="statut"
          value={formData.statut}
          onChange={handlers.handleInputChange}
          options={statutOptions}
        />
      </div>
    </div>
  );
};