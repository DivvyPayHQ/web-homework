import styled from '@emotion/styled'
import { CircularProgress } from '@material-ui/core'

export const Loading = styled(CircularProgress)`
  color: ${props => props.theme.colors.primary};
  width: 50px;
  height: 50px;
`
