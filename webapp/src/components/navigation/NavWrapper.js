import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { node } from 'prop-types'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import PeopleIcon from '@material-ui/icons/People'
import ReceiptIcon from '@material-ui/icons/Receipt'
import StoreIcon from '@material-ui/icons/Store'

import useNavigationStyles from '../../styles/navigation'

const propTypes = {
  children: node.isRequired
}

const NavWrapper = ({ children }) => {
  const classes = useNavigationStyles()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)
  const navLinks = [
    {
      id: 'home',
      text: 'Home',
      icon: <HomeIcon />,
      link: '/'
    }, {
      id: 'transactions',
      text: 'Transactions',
      icon: <ReceiptIcon />,
      link: '/transactions'
    }, {
      id: 'vendors',
      text: 'Vendors',
      icon: <StoreIcon />,
      link: '/vendors'
    }, {
      id: 'users',
      text: 'Users',
      icon: <PeopleIcon />,
      link: '/users'
    }
  ]
  return (
    <>
      <AppBar
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpen
        })}
        position='fixed'
      >
        <Toolbar>
          <IconButton
            aria-label='open drawer'
            className={clsx(classes.menuButton, {
              [classes.hide]: drawerOpen
            })}
            color='inherit'
            edge='start'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6'>
            Budget Buster
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })
        }}
        // eslint-disable-next-line
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen
        })}
        variant='permanent'
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navLinks.map(navLink => (
            <Link className={classes.navLink} key={navLink.id} to={navLink.link}>
              <ListItem button>
                <ListItemIcon>{navLink.icon}</ListItemIcon>
                <ListItemText primary={navLink.text} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </>
  )
}

NavWrapper.propTypes = propTypes
export default NavWrapper
