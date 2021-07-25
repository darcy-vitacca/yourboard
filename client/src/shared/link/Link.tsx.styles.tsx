import styled from 'styled-components/macro';
import { device } from '../../styles/devices';

export const LinkContainer = styled.div`
margin: 10px;
max-width:180px;
  border-radius: 10px;
  display: flex;
 
  flex-direction: row;
  cursor: pointer;
  * {
    background-color: ${({ theme }) => theme.colors.blue400};
  } 
`

export  const LinkSectionLeft = styled.div`
  padding:10px 10px 10px 5px;
  border-radius: 10px 0 0 10px;
  width:20%;
  display:flex;
  align-items: center;
`


export const LinkSectionRight = styled.div`
  width:80%;
  display: flex;
  padding:10px;
  border-radius: 0 10px 10px 0;
  flex-direction: column;`

export const LinkImg = styled.img`
 width:30px;`
