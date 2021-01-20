import React from 'react'
import { NavLink } from 'react-router-dom'
import { css } from '@emotion/core'
import { Drawer, Icon, IconButton } from '@material-ui/core'
import { Home, Receipt, VideogameAsset } from '@material-ui/icons'
import { bool, PropTypes, string } from 'prop-types'
// Icon courtesy of https://www.freepik.com
import WizardHatLogo from '../../components/icons/wizard-hat.png'

const DrawerNavLink = (props) => {
  return (
    <NavLink activeClassName='active-route' exact={props.exact} to={props.to}>
      {props.children}
    </NavLink>
  )
}

DrawerNavLink.propTypes = {
  children: PropTypes.node.isRequired,
  exact: bool,
  to: string
}

export function NavBar () {
  return (
    <Drawer anchor='left' css={css`.active-route { background-color: #dbdbdb !important; }`} variant='permanent'>
      <Icon css={css`
        width: 100% !important;
        height: 50px !important;
        padding-bottom: 100px !important;
      `}>
        <img
          alt='Yer a Harry Wizard'
          css={css`
              padding: 12px !important;
            `}
          src={WizardHatLogo}
          width={25}
        />
      </Icon>
      <DrawerNavLink exact to='/'>
        <IconButton>
          <Home />
        </IconButton>
      </DrawerNavLink>
      <DrawerNavLink to='/transactions'>
        <IconButton>
          <Receipt />
        </IconButton>
      </DrawerNavLink>
      <DrawerNavLink to='/lets-play'>
        <IconButton>
          <VideogameAsset />
        </IconButton>
      </DrawerNavLink>
    </Drawer>
  )
}
