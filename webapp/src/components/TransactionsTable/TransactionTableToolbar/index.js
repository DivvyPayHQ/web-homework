import React from 'react'
import { func, number } from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: '1 1 100%'
  }
}))
const TransactionTableToolbar = ({ numSelected, pushDelete }) => {
  const classes = useToolbarStyles()

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color='inherit' component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} component='div' id='tableTitle' variant='h6'>
          All Transactions
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title='Delete'>
          <IconButton aria-label='delete' onClick={pushDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

TransactionTableToolbar.propTypes = {
  numSelected: number.isRequired,
  pushDelete: func.isRequired
}

export default TransactionTableToolbar
