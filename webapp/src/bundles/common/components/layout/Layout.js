import React, { PureComponent } from 'react'
import { node, func, number, string } from 'prop-types'
import { connect } from 'react-redux'
import SideNav from '../navigation/components/SideNav'
import { css } from '@emotion/core'
import { windowResize } from '../../actions/windowResize'
import { selectViewState } from '../../reducers/ViewStateReducer'

class Layout extends PureComponent {
  componentDidMount () {
    const { windowResize } = this.props

    // Width
    windowResize()
    window.onresize = () => {
      windowResize()
    }
  }

  render () {
    const { children } = this.props
    return (
      <div css={layoutWrapper}>
        <SideNav />
        <div css={childrenWrapper}>
          {children}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    width: viewState.width,
    error: viewState.error
  }
}

function mapDispatchToProps (dispatch) {
  return {
    windowResize: () => { dispatch(windowResize()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)

const layoutWrapper = css`
  height: 100%;
  display: flex;
`

const childrenWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 15px;
  box-sizing: border-box;
  width: 845px;
`

Layout.propTypes = {
  children: node,
  windowResize: func.isRequired,
  width: number.isRequired,
  error: string
}
