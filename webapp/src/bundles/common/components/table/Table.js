import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

export default function Table (props) {
  const { theme, title, buttons, children, activePage, totalPages, onIncrementPage, onDecrementPage, onLastPage, loading } = props
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <p className={styles.title} style={{ color: theme.color }}>{title}</p>
        <div className={styles.buttonsContainer}>
          {buttons}
        </div>
      </div>
      {
        loading && (
          <div style={{ marginTop: '80px' }} />
        )
      }
      {
        !loading && (
          <Fragment>
            {children}
          </Fragment>
        )
      }
    </div>
  )
}

Table.defaultProps = {
  buttons: undefined,
  loading: false
}

Table.propTypes = {
  theme: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
  buttons: PropTypes.func,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onIncrementPage: PropTypes.func.isRequired,
  onDecrementPage: PropTypes.func.isRequired,
  onLastPage: PropTypes.func.isRequired,
  loading: PropTypes.bool
}
