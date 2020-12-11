/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import styled from '@emotion/styled'
import HomeIcon from '@material-ui/icons/Home'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)

    }
  }
}))

const Header = () => {
  const classes = useStyles()
  return (
    <Wrapper>

      <NavItem>
        <Link to='/'><HomeIcon style={{ color: 'black', width: '100px' }} /></Link>

      </NavItem>

      <NavItem>
        <Link style={{ textDecoration: 'none' }} to='/addUser'><Button style={{ minWidth: '150px', color: 'gray' }}>Add User</Button></Link>

        <Link style={{ textDecoration: 'none' }} to='/addMerchant'><Button style={{ minWidth: '150px', color: 'gray' }}>Add Merchant</Button></Link>

        <Link style={{ textDecoration: 'none' }} to='/addTransaction'><Button style={{ minWidth: '150px', color: 'gray' }}>Add Transation</Button></Link>
      </NavItem>
    </Wrapper>
  )
}
export default Header

const Wrapper = styled('div')`
height: 70px;
display: flex;
align-items: center;
justify-content: space-between;
box-shadow: 0 0px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
`

const NavItem = styled('div')`
display:flex;
justify-content: center;
align-items:center;
}
`
