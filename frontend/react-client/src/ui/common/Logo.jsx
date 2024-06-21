import styled from "styled-components";

const StyledLogo = styled.div`
  background: linear-gradient(
    90deg,
    oklch(63.32% 0.24 31.68) 0%, /* orange-red */
    oklch(69.02% 0.277 332.77) 50%, /* vivid-pink */
    oklch(53.18% 0.28 296.97) 100% /* electric-violet */
  );
  border-radius: 10px; /* Adjust border radius for rounded corners */
  height: 4rem; /* Adjusted height for the rectangular shape */
  width: 15rem; /* Adjusted width for the rectangular shape */
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center; /* Center text horizontally */
  align-items: center; /* Center text vertically */
  font-size: 1.2rem; /* Adjusted font size */
  font-weight: normal; /* Bold font for emphasis */
  padding: 0.5rem; /* Added padding for better spacing */
`;

export default StyledLogo;
