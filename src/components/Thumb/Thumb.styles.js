import styled from "styled-components";

export const Image = styled.img`
  max-width: var(--maxWidth);
  margin: 0 auto;  
  padding: 0 20px;

  h1 {
    color: var(--medGrey);

    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;