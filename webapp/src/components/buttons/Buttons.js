import styled from '@emotion/styled'
import { Button } from '@material-ui/core'

export const PrimaryButton = styled(Button)`
  white-space: nowrap;
  /* override material defaults with important */
  background-color: ${props => props.theme.colors.primary} !important;
  color: ${props => props.theme.colors.white} !important;
`

export const DangerButton = styled(Button)`
  white-space: nowrap;
  /* override material defaults with important */
  background-color: ${props => props.theme.colors.danger} !important;
  color: ${props => props.theme.colors.white} !important;
`

export const SuccessButton = styled(Button)`
  white-space: nowrap;
  /* override material defaults with important */
  background-color: ${props => props.theme.colors.success} !important;
  color: ${props => props.theme.colors.white} !important;
`
