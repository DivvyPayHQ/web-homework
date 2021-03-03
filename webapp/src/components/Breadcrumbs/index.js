import React from 'react'
import { shape, string } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Breadcrumbs as BC, Link } from '@material-ui/core'

const preventDefault = (e) => { e.preventDefault() }

const Breadcrumbs = ({ match, name = '' }) => {
  const { url } = match
  const pathArray = url.split('/')
  pathArray[0] = 'Home'

  return (
    <BC aria-label='breadcrumb'>
      {pathArray.map((subroute, i, arr) => {
        if (match.path === '/') return (null)
        if (arr.length - 1 === i) {
          return (
            <Link color='inherit' href='#' key={`key-${subroute}`} onClick={preventDefault}>
              {(name === '' ? subroute : name).trim().replace(/^\w/, (first) => first.toUpperCase())}
            </Link>
          )
        } else {
          return (
            <Link color='inherit' href={(subroute === 'Home' ? '/' : subroute)} key={`key-${subroute}`}>
              {subroute.trim().replace(/^\w/, (first) => first.toUpperCase())}
            </Link>
          )
        }
      })}
    </BC>
  )
}

Breadcrumbs.propTypes = {
  match: shape({}).isRequired,
  name: string
}

export default withRouter(Breadcrumbs)
