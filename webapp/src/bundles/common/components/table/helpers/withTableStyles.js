import React from 'react'
import * as styles from './tableStyles'
import { withStyles } from '@material-ui/styles'

export const withTableStyles = (WrappedComponent) => {
  const Result = (props) => {
    return <WrappedComponent {...props} />
  }
  return withStyles(styles)(Result)
}
