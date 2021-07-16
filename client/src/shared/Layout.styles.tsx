import styled from 'styled-components';
import { device } from '../styles/devices';

export interface ISectionContainerProps {
  align?: 'left' | 'center' | 'right';
}

export interface IButtonContainerProps {
  align?: 'left' | 'center' | 'right' | 'space-evenly';
}

export const PageLayoutContainer = styled.div`
  width: 100%;
  min-width: 260px;
  background-color: ${({ theme }) => theme.layout.background};
  box-shadow: ${({ theme }) => theme.shadow.box};
  padding: 10px 10px 10px;
  margin: 0 0 100px;

  @media ${device.laptop} {
    width: 1000px;
    margin: 0 auto 100px;
  }
`;
export const Form = styled.form``;

export const Row = styled.div`
  display: flex;
  flex-direction: column;

  @media ${device.mobileLrg} {
    flex-direction: row;

    > * {
      margin-left: 5px;

      &:first-child {
        margin-left: 0;
      }
    }
  }
`;
export const SectionContainer = styled.div<ISectionContainerProps>`
  min-height: 440px;
  padding: 20px 20px;
  display: ${({ align }) => (align ? 'flex' : 'inherit')};
  flex-direction: ${({ align }) => (align ? 'column' : 'inherit')};
  justify-content: ${({ align }) =>
    align === 'left'
      ? 'flex-start'
      : align === 'center'
      ? 'center'
      : align === 'right'
      ? 'flex-end'
      : 'inherit'};
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.mobileLrg} {
    flex-direction: row;
  }
`;

export const FormSectionContainer = styled.div`
  @media ${device.mobileLrg} {
    &.activateCardSection,
    &.balanceSection {
      margin-right: 20px;
      width: 65%;
    }
  }
`;

export const ButtonGroupContainer = styled.div<IButtonContainerProps>`
  display: flex;
  flex-direction: column;

  @media ${device.mobileLrg} {
    flex-direction: row;
    justify-content: ${({ align }) =>
      align === 'left'
        ? 'flex-start'
        : align === 'center'
        ? 'center'
        : align === 'right'
        ? 'flex-end'
        : align === 'space-evenly'
        ? 'space-evenly'
        : 'inherit'};
    .centerLeftBtn {
      margin-right: 20px;
    }
    .centerRightBtn {
      margin-left: 20px;
    }
  }
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary.default};
`;

export const Image = styled.img`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 240px;
  max-width: 440px;
  margin: 20px auto;
  border-radius: 12px;
  @media ${device.mobileLrg} {
    width: 70%;
  }
`;

export const ImageSplitFormSection = styled.img`
  width: 100%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  min-width: 180px;
  max-width: 470px;
  margin: 10px 0;
  border-radius: 12px;
`;
