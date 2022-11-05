import styled from "styled-components";

export const SlideImage = styled.img`
  width: 20px;
  height: 20px;
  object-fit: cover;
  opacity: 0.5;

  &:hover{
    opacity: 1;
  }

`;


export const StyledSlider = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;