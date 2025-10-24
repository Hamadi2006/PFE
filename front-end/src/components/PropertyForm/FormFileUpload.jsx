import React from 'react';
import { InputError } from './InputError';

export const FormFileUpload = ({
  label,
  name,
  onChange,
  error,
  touched,
  accept = 'image/*',
  multiple = false,
  file = null,
  files = [],
  note
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <input
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${
          error && touched ? 'border-red-500' : 'border-slate-300'
        }`}
      />
      {note && <p className="text-xs text-slate-500 mt-1">{note}</p>}
      <InputError error={touched && error} />
      
      {file && (
        <p className="text-xs text-green-600 mt-1">
          ✓ {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
      
      {files && files.length > 0 && (
        <div className="mt-2">
          <p className="text-xs text-green-600">✓ {files.length} image(s) sélectionnée(s)</p>
          <ul className="text-xs text-slate-600 mt-1 space-y-1">
            {files.map((img, idx) => (
              <li key={idx}>• {img.name} ({(img.size / 1024 / 1024).toFixed(2)} MB)</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};