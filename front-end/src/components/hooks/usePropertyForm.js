import { useState } from 'react';
import { validateField, validateForm } from '../utils/propertyValidation';

export const usePropertyForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const files = e.target.files;
    let value;
    
    if (fieldName === 'image_principale') {
      value = files[0] || null;
    } else {
      value = Array.from(files);
    }

    setFormData(prev => ({ ...prev, [fieldName]: value }));
    
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
  };

  const validateAllFields = () => {
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formData,
    errors,
    touched,
    loading,
    setLoading,
    handleInputChange,
    handleBlur,
    handleFileChange,
    resetForm,
    validateAllFields
  };
};