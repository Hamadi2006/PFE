import React from 'react';
import { FormCheckbox } from '../index';

export const AmenitiesSection = ({ formData, handlers, t }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties.sections.amenities')}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <FormCheckbox
          label={t('properties.amenities.piscine')}
          name="piscine"
          checked={formData.piscine}
          onChange={handlers.handleInputChange}
        />

        <FormCheckbox
          label={t('properties.amenities.jardin')}
          name="jardin"
          checked={formData.jardin}
          onChange={handlers.handleInputChange}
        />

        <FormCheckbox
          label={t('properties.amenities.parking')}
          name="parking"
          checked={formData.parking}
          onChange={handlers.handleInputChange}
        />

        <FormCheckbox
          label={t('properties.amenities.ascenseur')}
          name="ascenseur"
          checked={formData.ascenseur}
          onChange={handlers.handleInputChange}
        />

        <FormCheckbox
          label={t('properties.amenities.climatisation')}
          name="climatisation"
          checked={formData.climatisation}
          onChange={handlers.handleInputChange}
        />

        <FormCheckbox
          label={t('properties.amenities.en_vedette')}
          name="en_vedette"
          checked={formData.en_vedette}
          onChange={handlers.handleInputChange}
        />
      </div>
    </div>
  );
};
