import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageGallery = ({ property }) => {
  const { t } = useTranslation();
  
  // Parse les images depuis le JSON string
  const parseImages = () => {
    try {
      if (property.images && typeof property.images === 'string') {
        return JSON.parse(property.images);
      }
      return property.images_urls || [];
    } catch (error) {
      console.error('Error parsing images:', error);
      return [];
    }
  };

  const secondaryImages = parseImages();
  const mainImageUrl = `http://localhost:8000/storage/${property.image_principale}`;
  const secondaryImagesUrls = secondaryImages.map(img => `http://localhost:8000/storage/${img}`);
  
  const allImages = [mainImageUrl, ...secondaryImagesUrls];
  
  const [currentImage, setCurrentImage] = useState(mainImageUrl);
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  
  // Nombre d'images visibles selon la taille de l'écran
  const visibleImages = 6;

  const handleImageChange = (img, index) => {
    setCurrentImage(img);
    setActiveIndex(index);
  };

  const handlePrevSlide = () => {
    if (sliderPosition > 0) {
      setSliderPosition(prev => prev - 1);
    }
  };

  const handleNextSlide = () => {
    if (sliderPosition < allImages.length - visibleImages) {
      setSliderPosition(prev => prev + 1);
    }
  };

  const canSlidePrev = sliderPosition > 0;
  const canSlideNext = sliderPosition < allImages.length - visibleImages;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-8">
      <div className="relative">
        <img 
          src={currentImage} 
          alt={property.titre} 
          className="w-full h-96 object-cover"
        />
        
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold">
            {property.statut === 'disponible' ? t('imageGallery.new') : property.statut}
          </span>
          <span className={`${property.transaction === 'vente' ? 'bg-green-500' : 'bg-blue-500'} text-white px-4 py-2 rounded-full text-sm font-bold`}>
            {property.transaction === 'vente' ? t('imageGallery.forSale') : t('imageGallery.forRent')}
          </span>
        </div>

        {/* Compteur d'images */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
          {activeIndex + 1} / {allImages.length}
        </div>
      </div>
      
      {allImages.length > 1 && (
        <div className="p-4 relative">
          {/* Slider Container */}
          <div className="relative flex items-center">
            {/* Bouton Précédent */}
            {canSlidePrev && (
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                aria-label="Image précédente"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
            )}

            {/* Images Container avec overflow */}
            <div className="overflow-hidden mx-8">
              <div 
                className="flex gap-3 transition-transform duration-300 ease-in-out"
                style={{ 
                  transform: `translateX(-${sliderPosition * (100 / visibleImages)}%)` 
                }}
              >
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / visibleImages}% - 12px)` }}
                  >
                    <img
                      src={img}
                      alt={`${property.titre} ${index + 1}`}
                      className={`cursor-pointer w-50 h-20 object-cover rounded-lg border-2 transition-all hover:scale-105 ${
                        activeIndex === index ? 'border-cyan-600 border-4' : 'border-gray-300 dark:border-gray-600'
                      }`}
                      onClick={() => handleImageChange(img, index)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=Image+non+disponible';
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Bouton Suivant */}
            {canSlideNext && (
              <button
                onClick={handleNextSlide}
                className="absolute right-0 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                aria-label="Image suivante"
              >
                <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </button>
            )}
          </div>

          {/* Indicateur de position */}
          {allImages.length > visibleImages && (
            <div className="flex justify-center mt-3 gap-1">
              {Array.from({ length: Math.ceil(allImages.length / visibleImages) }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    Math.floor(sliderPosition / visibleImages) === index
                      ? 'w-6 bg-cyan-600'
                      : 'w-1.5 bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;