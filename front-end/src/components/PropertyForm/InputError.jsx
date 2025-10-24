import React from 'react';
import { AlertCircle } from 'lucide-react';

export const InputError = ({ error }) => {
  if (!error) return null;
  return (
    <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
      <AlertCircle className="w-3 h-3" />
      <span>{error}</span>
    </div>
  );
};