import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { Drawer, IconButton, MenuItem, Select } from '@material-ui/core'
import { Menu as HamburgerIcon, Settings } from '@material-ui/icons'
import { translate } from '../../utils/translate'

const Nav = styled.nav`
  display: flex;
  padding: .5em 1em;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
  background-color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fontFamily};
  margin-bottom: 1em;
`

const Title = styled.h1`
  margin: 0;
  color: ${props => props.theme.colors.black};
  letter-spacing: .1em;
`

const StyledDrawer = styled(Drawer)`
  text-transform: capitalize;

  .MuiDrawer-paper {
    min-width: 15em;

    @media screen and (max-width: 17em) {
      width: 80vw;
    }
  }
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.colors.black};
`

const MenuHeader = styled.section`
  background-color: ${props => props.theme.colors.black};
  padding: 6px 16px;
  line-height: 1.5;
  display: flex;
  letter-spacing: 0.00938em;
  color: white;
`

const LanguageContainer = styled.section`
  padding: .5em;

  > div:first-of-type {
    width: 100%;
  }
`

export const NavBar = () => {
  const [navigationMenuOpen, setNavigationMenuOpen] = useState(false)
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const localStorage = window.localStorage
  const selectedLanguage = localStorage.getItem('divvyLocale') || 'en'
  const [locale, setLocale] = useState(selectedLanguage)

  const closeNavigationMenu = () => setNavigationMenuOpen(false)

  const changeLanguage = e => {
    const locale = e.target.value
    localStorage.setItem('divvyLocale', locale)
    setLocale(locale)
    window.location.reload()
  }

  return (
    <>
      <Nav>
        <IconButton onClick={() => setNavigationMenuOpen(true)}>
          <HamburgerIcon />
        </IconButton>
        <Title>DIVVY</Title>
        <IconButton onClick={() => setSettingsMenuOpen(true)}>
          <Settings />
        </IconButton>
      </Nav>

      {/* Navigation Menu */}
      <StyledDrawer anchor='left' onClose={closeNavigationMenu} open={navigationMenuOpen}>
        <MenuHeader>{translate('navigation')}</MenuHeader>
        <StyledLink onClick={closeNavigationMenu} to='/transactions'>
          <MenuItem>{translate('transactions')}</MenuItem>
        </StyledLink>
        <StyledLink onClick={closeNavigationMenu} to='/users'>
          <MenuItem>{translate('users')}</MenuItem>
        </StyledLink>
        <StyledLink onClick={closeNavigationMenu} to='/merchants'>
          <MenuItem>{translate('merchants')}</MenuItem>
        </StyledLink>
        <StyledLink onClick={closeNavigationMenu} to='/categories'>
          <MenuItem>{translate('categories')}</MenuItem>
        </StyledLink>
      </StyledDrawer>

      {/* Settings menu */}
      <StyledDrawer anchor='right' onClose={() => setSettingsMenuOpen(false)} open={settingsMenuOpen}>
        <MenuHeader>{translate('language')}</MenuHeader>
        <LanguageContainer>
          <Select
            id='language-select'
            onChange={changeLanguage}
            value={locale}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='gr'>Ελληνικά</MenuItem>
          </Select>
        </LanguageContainer>
      </StyledDrawer>
    </>
  )
}
