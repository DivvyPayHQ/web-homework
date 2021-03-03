import React from 'react'
import { func, shape, string } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, CardActionArea, CardContent, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})
function TeamCard ({ name, history, id }) {
  const classes = useStyles()

  function handleClick () {
    history.push(`merchants/${id}`)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={handleClick}
      >
        <CardContent>
          <Typography align='center' component='h2' noWrap variant='h5'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default withRouter(TeamCard)

TeamCard.propTypes = {
  name: string.isRequired,
  history: shape({
    push: func.isRequired
  }).isRequired,
  id: string.isRequired
}
