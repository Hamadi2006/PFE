import React from 'react';
import { FormInput } from '../index';

export const ContactSection = ({ formData, errors, touched, handlers, t }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties2.sections.contact')}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormInput
          label={t('properties2.fields.nom_contact')}
          name="nom_contact"
          value={formData.nom_contact}
          onChange={handlers.handleInputChange}
        />

        <FormInput
          label={t('properties2.fields.telephone_contact')}
          name="telephone_contact"
          type="tel"
          value={formData.telephone_contact}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.telephone_contact}
          touched={touched.telephone_contact}
        />

        <FormInput
          label={t('properties2.fields.email_contact')}
          name="email_contact"
          type="email"
          value={formData.email_contact}
          onChange={handlers.handleInputChange}
          onBlur={handlers.handleBlur}
          error={errors.email_contact}
          touched={touched.email_contact}
        />
      </div>
    </div>
  );
};