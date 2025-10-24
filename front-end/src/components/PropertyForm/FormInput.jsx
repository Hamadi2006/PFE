import React from 'react';
import { InputError } from './InputError';

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  required = false,
  ...props
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error && touched ? 'border-red-500' : 'border-slate-300'
        }`}
        {...props}
      />
      <InputError error={touched && error} />
    </div>
  );
};