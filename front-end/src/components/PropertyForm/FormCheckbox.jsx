import React from 'react';

export const FormCheckbox = ({ label, name, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
};