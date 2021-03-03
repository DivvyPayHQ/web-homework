import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: 'auto',
    maxWidth: '50px'
  }
})

export default function Loading () {
  const classes = useStyles()
  return (
    <img alt='Loading...' className={classes.root} src='https://media.tenor.com/images/a742721ea2075bc3956a2ff62c9bfeef/tenor.gif' />
  )
}
