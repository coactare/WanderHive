import styled from 'styled-components';

const StyledCarousel = styled.div`
  display: flex;
  overflow-x: auto;
  margin: 0px 2rem 2rem 2rem; /* top right bottom left */
  overflow-y:hidden;
`;

const StyledSlide = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height:100%;
`;

function Carousel() {
    return (
        <StyledCarousel>
            <StyledSlide>
                <img src="./hero1.png" alt="first slide" />
            </StyledSlide>
            <StyledSlide>
                <img src="./hero2.png" alt="second slide" />
            </StyledSlide>
        </StyledCarousel>
    );

}

export default Carousel;