import React from 'react';
import { FormInput } from '../index';

export const LocationSection = ({ formData, errors, touched, handlers, t }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties2.sections.location')}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label={t('properties2.fields.ville')}
          name="ville"
          value={formData.ville}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.ville}
          touched={touched.ville}
          required
        />

        <FormInput
          label={t('properties2.fields.adresse')}
          name="adresse"
          value={formData.adresse}
          onChange={handlers.handleInputChange}
        />

        <FormInput
          label={t('properties2.fields.latitude')}
          name="latitude"
          type="number"
          value={formData.latitude}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.latitude}
          touched={touched.latitude}
          step="0.00000001"
        />

        <FormInput
          label={t('properties2.fields.longitude')}
          name="longitude"
          type="number"
          value={formData.longitude}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.longitude}
          touched={touched.longitude}
          step="0.00000001"
        />
      </div>
    </div>
  );
};