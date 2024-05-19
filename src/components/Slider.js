import React, { useState, useEffect, useRef } from 'react';
import './Slider.css';

const imagesSlide = [
  { url: 'https://wallpaperaccess.com/full/13219.jpg', alt: 'Slide 1', link: 'https://wallpaperaccess.com/full/13219.jpg' },
  { url: 'https://images5.alphacoders.com/313/313218.jpg', alt: 'Slide 2', link: 'https://images5.alphacoders.com/313/313218.jpg' },
  { url: 'https://www.teahub.io/photos/full/314-3147708_new-zealand-wallpaper.jpg', alt: 'Slide 3', link: 'https://www.teahub.io/photos/full/314-3147708_new-zealand-wallpaper.jpg' },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoSlideRef = useRef();

  const nextSlide = () => {
    if (!isTransitioning) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSlide.length);
      setIsTransitioning(true);
      resetAutoSlide();
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imagesSlide.length) % imagesSlide.length);
      setIsTransitioning(true);
      resetAutoSlide();
    }
  };

  const goToSlide = (index) => {
    if (!isTransitioning) {
      setCurrentIndex(index);
      setIsTransitioning(true);
      resetAutoSlide();
    }
  };

  const resetAutoSlide = () => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
    }
    autoSlideRef.current = setInterval(nextSlide, 3000);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  useEffect(() => {
    resetAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>❮</button>
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {imagesSlide.map((image, index) => (
          <div key={index} className="slide">
            <a href={image.link} target="_blank" rel="noopener noreferrer">
              <img
                src={image.url}
                alt={image.alt}
                className={index === currentIndex ? 'active' : 'inactive'}
              />
            </a>
          </div>
        ))}
      </div>

      <button className="next" onClick={nextSlide}>❯</button>
      <div className="navigation">
        {imagesSlide.map((_, index) => (
          <div
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
