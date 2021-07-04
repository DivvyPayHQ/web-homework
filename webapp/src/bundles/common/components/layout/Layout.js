import React, { PureComponent } from 'react'
import { node, func, number, string } from 'prop-types'
import { connect } from 'react-redux'
import SideNav from '../navigation/components/SideNav'
import MobileNav from '../navigation/components/MobileNav';
import { css } from '@emotion/core'
import { windowResize } from '../../actions/windowResize'
import { selectViewState } from '../../reducers/ViewStateReducer'
import * as BREAK_POINTS from '../../constants/breakpoints'

class Layout extends PureComponent {
  componentDidMount () {
    const { windowResize } = this.props

    // Width
    windowResize()
    window.onresize = () => {
      windowResize()
    }
  }

  getWidth = () => {
    const { width } = this.props
    if (width < BREAK_POINTS.DESKTOP) {
      return '100%'
    }
    return BREAK_POINTS.DESKTOP
  }

  render () {
    const { children, title } = this.props

    return (
      <div css={layoutWrapper}>
        <div css={desktopWrapper}>
          <SideNav />
        </div>
        <div css={mobileWrapper}>
          <MobileNav />
        </div>
        <div css={childrenWrapper}>
          <p className='title'>{title}</p>
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
  
  @media(max-width: 450px) {
    flex-direction: column;
  }
`

const childrenWrapper = css`
  margin: 0 auto;
  padding: 0 15px;
  width: 845px;
  
  .title {
    font-weight: 700;
    font-size: 24px;
    text-transform: capitalize;
  }
  
  @media(max-width: 1000px) {
    width: 430px;
  }
  
  @media(max-width: 450px) {
    width: 100%;
  }
`

const desktopWrapper = css`
  @media(max-width: 450px) {
    display: none;
  }
`

const mobileWrapper = css`
  @media(min-width: 450px) {
    display: none;
  }
`

Layout.propTypes = {
  children: node,
  windowResize: func.isRequired,
  width: number.isRequired,
  error: string,
  title: string
}
