import React from 'react';
import { FormFileUpload } from '../index';

export const ImagesSection = ({ formData, errors, touched, handlers, t }) => {
  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-slate-800 mb-4">
        {t('properties.sections.images')}
      </h4>
      <div className="grid grid-cols-1 gap-4">
        <FormFileUpload
          label={t('properties.fields.image_principale')}
          name="image_principale"
          onChange={(e) => handlers.handleFileChange(e, 'image_principale')}
          error={errors.image_principale}
          touched={touched.image_principale}
          file={formData.image_principale}
        />

        <FormFileUpload
          label={t('properties.fields.images_supplementaires')}
          name="images"
          onChange={(e) => handlers.handleFileChange(e, 'images')}
          error={errors.images}
          touched={touched.images}
          multiple
          files={formData.images}
          note={t('properties.fields.images_note')}
        />
      </div>
    </div>
  );
};