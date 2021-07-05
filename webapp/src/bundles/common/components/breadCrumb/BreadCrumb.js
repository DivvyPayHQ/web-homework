import React, { Fragment } from 'react'
import { shape, arrayOf } from 'prop-types'
import { Link } from 'react-router-dom'
import { css } from '@emotion/core'
import shortId from 'shortid'

export default function BreadCrumb (props) {
  const { links, theme } = props
  const end = links.length - 1
  return (
    <div css={containerStyles}>
      {
        links.map((link, index) => {
          const { url, name } = link
          return (
            <Fragment key={shortId.generate()}>
              <Link to={url}>
                <p css={anchorStyles} style={{ color: theme.highlight }}>
                  {name}
                </p>
              </Link>
              {
                index !== end && (
                  <p css={anchorStyles} style={{ color: theme.highlight }}>&nbsp;>&nbsp;</p>
                )
              }
            </Fragment>
          )
        })
      }
    </div>
  )
}

const containerStyles = css`
  display: flex;
  padding-bottom: 15px;
  
  a {
    text-decoration: none;
  }
`
const anchorStyles = css`
  margin: 0;
`

BreadCrumb.propTypes = {
  theme: shape().isRequired,
  links: arrayOf(shape()).isRequired
}
