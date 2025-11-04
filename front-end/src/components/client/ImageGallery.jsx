import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';

const ImageGallery = ({ property }) => {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  
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
  
  const visibleImages = 6;

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => {
        const nextIndex = (prev + 1) % allImages.length;
        setCurrentImage(allImages[nextIndex]);
        
        // Update slider position if needed
        if (nextIndex >= sliderPosition + visibleImages) {
          setSliderPosition(prev => Math.min(prev + 1, allImages.length - visibleImages));
        } else if (nextIndex < sliderPosition) {
          setSliderPosition(Math.max(0, nextIndex - visibleImages + 1));
        }
        
        return nextIndex;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoPlay, allImages, sliderPosition]);

  const handleImageChange = (img, index) => {
    setCurrentImage(img);
    setActiveIndex(index);
    setAutoPlay(false);
  };

  const handlePrevSlide = () => {
    const newIndex = (activeIndex - 1 + allImages.length) % allImages.length;
    handleImageChange(allImages[newIndex], newIndex);
    
    if (sliderPosition > 0) {
      setSliderPosition(prev => prev - 1);
    }
  };

  const handleNextSlide = () => {
    const newIndex = (activeIndex + 1) % allImages.length;
    handleImageChange(allImages[newIndex], newIndex);
    
    if (sliderPosition < allImages.length - visibleImages) {
      setSliderPosition(prev => prev + 1);
    }
  };

  const canSlidePrev = sliderPosition > 0;
  const canSlideNext = sliderPosition < allImages.length - visibleImages;

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl overflow-hidden mb-8">
        {/* Main Image Section */}
        <div className="relative group bg-black">
          <img 
            src={currentImage} 
            alt={property.titre} 
            className="w-full h-96 md:h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2 z-20">
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm bg-opacity-90">
              {property.statut === 'disponible' ? t('imageGallery.new') : property.statut}
            </span>
            <span className={`${property.transaction === 'vente' ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm bg-opacity-90`}>
              {property.transaction === 'vente' ? t('imageGallery.forSale') : t('imageGallery.forRent')}
            </span>
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm z-20">
            {activeIndex + 1} / {allImages.length}
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-4 right-4 bg-white dark:bg-gray-700 bg-opacity-80 hover:bg-opacity-100 text-gray-800 dark:text-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110 z-20 backdrop-blur-sm"
            aria-label="Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Navigation Arrows - Main */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-80 hover:bg-opacity-100 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 z-20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 bg-opacity-80 hover:bg-opacity-100 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 z-20 backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Thumbnail Slider */}
        {allImages.length > 1 && (
          <div className="bg-gray-50 dark:bg-gray-900 p-5 border-t border-gray-200 dark:border-gray-700">
            <div className="relative flex items-center">
              {/* Prev Button */}
              {canSlidePrev && (
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-0 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-md transition-all transform hover:scale-110"
                  aria-label="Scroll précédent"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
              )}

              {/* Thumbnails Container */}
              <div className="overflow-hidden mx-10">
                <div 
                  className="flex gap-3 transition-transform duration-300 ease-out"
                  style={{ 
                    transform: `translateX(-${sliderPosition * (100 / visibleImages)}%)` 
                  }}
                >
                  {allImages.map((img, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 group/thumb"
                      style={{ width: `calc(${100 / visibleImages}% - 12px)` }}
                    >
                      <img
                        src={img}
                        alt={`${property.titre} ${index + 1}`}
                        className={`cursor-pointer w-full h-20 object-cover rounded-lg border-2 transition-all duration-300 ${
                          activeIndex === index 
                            ? 'border-cyan-600 scale-105 ring-2 ring-cyan-400' 
                            : 'border-gray-300 dark:border-gray-600 hover:scale-105 hover:border-cyan-400'
                        }`}
                        onClick={() => handleImageChange(img, index)}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Image+non+disponible';
                        }}
                      />
                      <div className="absolute inset-0 rounded-lg bg-black opacity-0 group-hover/thumb:opacity-10 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Button */}
              {canSlideNext && (
                <button
                  onClick={handleNextSlide}
                  className="absolute right-0 z-10 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full shadow-md transition-all transform hover:scale-110"
                  aria-label="Scroll suivant"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
              )}
            </div>

            {/* Progress Dots */}
            {allImages.length > visibleImages && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({ length: Math.ceil(allImages.length / visibleImages) }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-cyan-500 ${
                      Math.floor(sliderPosition / visibleImages) === index
                        ? 'w-8 bg-cyan-600'
                        : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => {
                      const newPosition = index * visibleImages;
                      setSliderPosition(Math.min(newPosition, allImages.length - visibleImages));
                      handleImageChange(allImages[newPosition], newPosition);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full transition-all transform hover:scale-110 z-50 backdrop-blur-sm"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={currentImage} 
              alt={property.titre}
              className="max-w-full max-h-full object-contain"
            />

            {/* Fullscreen Navigation */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNextSlide}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-4 rounded-full transition-all transform hover:scale-110 backdrop-blur-sm"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Fullscreen Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-6 py-3 rounded-full text-lg font-semibold backdrop-blur-sm">
              {activeIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;