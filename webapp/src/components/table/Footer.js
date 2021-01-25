import styled from '@emotion/styled'

export const Footer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-top: thin solid ${props => props.theme.colors.black};
  font-family: ${props => props.theme.fontFamily};
  padding: 0 1em;
  font-weight: bold;
`
