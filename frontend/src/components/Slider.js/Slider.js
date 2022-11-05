import React, { useState } from "react";
import { SlideImage, StyledSlider } from "./SlideImage";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './Slider.css'
import filterIcon from '../../icons/filter.png'

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 2 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <StyledSlider>
    <div className="left">
      <FontAwesomeIcon
      icon={faChevronLeft}
        className="left-arrow"
        onClick={prevSlide}
      />
      </div>
      {slides.map((slide, index) => {
        return (
          <div key={index} className='slide-container-content'>
          <div className="slide-images">
            {index >= current && (
              <SlideImage src={slide.image} alt="" /> 
            )}
            </div>
            <span>{slide.label}</span>
          </div>
        );
      })}
      <div className="right">
      <FontAwesomeIcon
      icon={faChevronRight}
        className="right-arrow"
        onClick={nextSlide}
      />
      </div>
      <button className="filter_btn"> 
      <div className="filter-content">
      <img className="filter-icon" src={filterIcon} alt='filter'/>
      <span>Filter</span>
      </div>
      
      
      </button>
      
    </StyledSlider>
  );
};

export default Slider;
