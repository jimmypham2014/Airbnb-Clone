import React, { useState } from "react";
import { SlideImage, StyledSlider } from "./SlideImage";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <StyledSlider>
      <FontAwesomeIcon
      icon={faChevronLeft}
        className="left-arrow"
        onClick={prevSlide}
      />
      <FontAwesomeIcon
      icon={faChevronRight}
        className="right-arrow"
        onClick={nextSlide}
      />
      {slides.map((slide, index) => {
        return (
          <div key={index}>
            {index === current && (
              <SlideImage src={slide.image} alt="" />
            )}
          </div>
        );
      })}
    </StyledSlider>
  );
};

export default Slider;
