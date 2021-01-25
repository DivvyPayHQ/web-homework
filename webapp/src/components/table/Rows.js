import styled from '@emotion/styled'
import { TableBody } from '@material-ui/core'

export const Rows = styled(TableBody)`
   > :nth-child(even) {
    background-color: ${props => props.theme.colors.transparentPrimary};
  }
  > :nth-child(odd) {
    background-color: transparent;
  }
`
