import styled from 'styled-components/macro';

export const FooterLinkSection = styled.div`
  margin: 30px 20px;
  display: flex;
  justify-content: center;
`;

export const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 20px;
  text-align: center;
  * {
    display: inline;
    color: ${({ theme }) => theme.colors.text.black};
  }

  .divider {
    padding: 0 5px;
  }
`;
