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
    const { children, title, buttons } = this.props

    return (
      <div css={layoutWrapper}>
        <div css={desktopWrapper}>
          <SideNav />
        </div>
        <div css={mobileWrapper}>
          <MobileNav />
        </div>
        <div css={contentWrapper}>
          <div css={titleButtonsContainer}>
            <p css={text}>{title}</p>
            <div>
              {buttons}
            </div>
          </div>
          <div css={childrenWrapper}>
            {children}
          </div>
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

const contentWrapper = css`
  margin: 0 auto;
  padding: 0 15px;
  width: 845px;
`

const childrenWrapper = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-grow: 1;
  margin: auto;
  padding: 0 15px;
  box-sizing: border-box;
  
  @media(max-width: 1000px) {
    width: 430px;
  }
  
  @media(max-width: 450px) {
    width: 100%;
  }
`

const titleButtonsContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const text = css`
  font-weight: 700;
  font-size: 24px;
  text-transform: capitalize;
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
Layout.defaultProps = {
  buttons: undefined,
}

Layout.propTypes = {
  children: node,
  windowResize: func.isRequired,
  width: number.isRequired,
  error: string,
  title: string,
  buttons: node
}
