import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { AppBar, CssBaseline, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core'
import BusinessIcon from '@material-ui/icons/Business'
import CategoryIcon from '@material-ui/icons/Category'
import GroupIcon from '@material-ui/icons/Group'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { Transactions, Transaction, Merchant, Merchants, Category, Categories, User, Users } from 'views'
import styled from '@emotion/styled'
import { makeStyles } from '@material-ui/core/styles'

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    color: inherit;
    text-decoration: none;
  }
`
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))

const drawerWidth = 240

export default function AppRouter () {
  const classes = useStyles()

  return (
    <Router>
      <div className={classes.main}>
        <CssBaseline />
        <AppBar className={classes.appBar} position='fixed'>
          <Toolbar>
            <Typography noWrap variant='h6'>NHL Transaction Manager</Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor='left'
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper
          }}
          variant='permanent'
        >
          <div className={classes.toolbar} style={{ textAlign: 'center' }}><img alt='' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetdivvy.com%2Fwp-content%2Fuploads%2F2019%2F05%2FDivvy-Logo-19.png&f=1&nofb=1' style={{ width: '60%' }} /></div>
          <Divider />
          <List>
            <StyledLink to='/'>
              <ListItem button key={1}>
                <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
                <ListItemText primary='Transactions' />
              </ListItem>
            </StyledLink>
            <StyledLink to='/merchants'>
              <ListItem button key={2}>
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary='Merchants' />
              </ListItem>
            </StyledLink>
            <StyledLink to='/categories'>
              <ListItem button key={3}>
                <ListItemIcon><CategoryIcon /></ListItemIcon>
                <ListItemText primary='Categories' />
              </ListItem>
            </StyledLink>
            <StyledLink to='/users'>
              <ListItem button key={4}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary='Users' />
              </ListItem>
            </StyledLink>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Route component={Transactions} exact path='/' />
          <Route component={Transaction} exact path='/transactions/:id' />
          <Route component={Merchants} exact path='/merchants' />
          <Route component={Merchant} path='/merchants/:id' />
          <Route component={Categories} exact path='/categories' />
          <Route component={Category} path='/categories/:id' />
          <Route component={Users} exact path='/users' />
          <Route component={User} exact path='/users/:id' />
        </main>
      </div>
    </Router>
  )
}
