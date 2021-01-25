import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from '@emotion/styled'
import { CategoriesPage, MerchantsPage, TransactionsPage, UsersPage } from './pages'
import { NavBar } from './components/nav'

const Page = styled.article`
  min-width: 100vw;
  min-height: 100vh;
`

const PageContent = styled.article`
  width: 90vw;
  background-color: ${props => props.theme.colors.white};

  @media screen and (max-width: 75em) {
    width: 96vw;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`

function AppRouter () {
  return (
    <Router>
      <Page>
        <NavBar />
        <ContentWrapper>
          <PageContent>
            <Route component={TransactionsPage} exact path='/' />
            <Route component={TransactionsPage} exact path='/transactions' />
            <Route component={UsersPage} exact path='/users' />
            <Route component={MerchantsPage} exact path='/merchants' />
            <Route component={CategoriesPage} exact path='/categories' />
          </PageContent>
        </ContentWrapper>
      </Page>
    </Router>
  )
}

export default AppRouter
