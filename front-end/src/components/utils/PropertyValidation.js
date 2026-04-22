export const validateField = (name, value) => {
  let error = '';

  switch (name) {
    case 'societe_id':
      if (!value) {
        error = 'Veuillez selectionner une societe';
      }
      break;

    case 'titre':
      if (!value || value.trim().length === 0) {
        error = 'Le titre est requis';
      } else if (value.trim().length < 5) {
        error = 'Le titre doit contenir au moins 5 caractères';
      } else if (value.trim().length > 200) {
        error = 'Le titre ne peut pas dépasser 200 caractères';
      }
      break;

    case 'description':
      if (value && value.trim().length > 2000) {
        error = 'La description ne peut pas dépasser 2000 caractères';
      }
      break;

    case 'prix':
      if (!value || value === '') {
        error = 'Le prix est requis';
      } else if (parseFloat(value) <= 0) {
        error = 'Le prix doit être supérieur à 0';
      } else if (parseFloat(value) > 999999999) {
        error = 'Le prix est trop élevé';
      }
      break;

    case 'surface':
      if (!value || value === '') {
        error = 'La surface est requise';
      } else if (parseFloat(value) <= 0) {
        error = 'La surface doit être supérieure à 0';
      } else if (parseFloat(value) > 100000) {
        error = 'La surface est trop élevée';
      }
      break;

    case 'ville':
      if (!value || value.trim().length === 0) {
        error = 'La ville est requise';
      } else if (value.trim().length < 2) {
        error = 'Le nom de la ville doit contenir au moins 2 caractères';
      }
      break;

    case 'latitude':
      if (value && (parseFloat(value) < -90 || parseFloat(value) > 90)) {
        error = 'La latitude doit être entre -90 et 90';
      }
      break;

    case 'longitude':
      if (value && (parseFloat(value) < -180 || parseFloat(value) > 180)) {
        error = 'La longitude doit être entre -180 et 180';
      }
      break;

    case 'chambres':
      if (value && (parseInt(value) < 0 || parseInt(value) > 50)) {
        error = 'Le nombre de chambres doit être entre 0 et 50';
      }
      break;

    case 'salles_de_bain':
      if (value && (parseInt(value) < 0 || parseInt(value) > 20)) {
        error = 'Le nombre de salles de bain doit être entre 0 et 20';
      }
      break;

    case 'annee_construction': {
      const currentYear = new Date().getFullYear();
      if (value && (parseInt(value) < 1800 || parseInt(value) > currentYear + 5)) {
        error = `L'année doit être entre 1800 et ${currentYear + 5}`;
      }
      break;
    }

    case 'etage':
      if (value && (parseInt(value) < -5 || parseInt(value) > 200)) {
        error = 'L\'étage doit être entre -5 et 200';
      }
      break;

    case 'nombre_etages':
      if (value && (parseInt(value) < 1 || parseInt(value) > 200)) {
        error = 'Le nombre d\'étages doit être entre 1 et 200';
      }
      break;

    case 'telephone_contact':
      if (value && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(value)) {
        error = 'Le numéro de téléphone n\'est pas valide';
      }
      break;

    case 'email_contact':
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = 'L\'email n\'est pas valide';
      }
      break;

    case 'image_principale':
      if (value) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024;
        
        if (!validTypes.includes(value.type)) {
          error = 'Format d\'image non valide (JPG, PNG, WEBP acceptés)';
        } else if (value.size > maxSize) {
          error = 'L\'image ne doit pas dépasser 5MB';
        }
      }
      break;

    case 'images':
      if (value && value.length > 0) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024;
        const maxImages = 10;

        if (value.length > maxImages) {
          error = `Vous ne pouvez pas télécharger plus de ${maxImages} images`;
        } else {
          for (let file of value) {
            if (!validTypes.includes(file.type)) {
              error = 'Tous les fichiers doivent être des images (JPG, PNG, WEBP)';
              break;
            }
            if (file.size > maxSize) {
              error = 'Chaque image ne doit pas dépasser 5MB';
              break;
            }
          }
        }
      }
      break;

    default:
      break;
  }

  return error;
};

export const validateForm = (formData) => {
  const newErrors = {};
  
  const requiredFields = ['societe_id', 'titre', 'prix', 'surface', 'ville', 'type', 'transaction'];
  
  requiredFields.forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) {
      newErrors[field] = error;
    }
  });

  const optionalFields = ['description', 'latitude', 'longitude', 'chambres', 'salles_de_bain', 
                         'annee_construction', 'etage', 'nombre_etages', 'telephone_contact', 
                         'email_contact', 'image_principale', 'images'];
  
  optionalFields.forEach(field => {
    if (formData[field]) {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }
  });

  return newErrors;
};
