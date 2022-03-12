import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'

import { PieChartPage } from './components/graphs/pieChartPage.jsx'
import Header from './components/header.jsx'

function AppRouter () {
  const [convertRoman, setConvertRoman] = useState(true)
  const [isI18nEnabled, setIsI18nEnabled] = useState(window.location.search.includes('i18n=true'))

  return (
    <Router>
      <div css={layoutStyle}>
        <Header convertRoman={convertRoman} isI18nEnabled={isI18nEnabled} setConvertRoman={setConvertRoman} setIsI18nEnabled={setIsI18nEnabled} />
        <div className='main-content' css={contentStyle}>
          <Switch>
            <Route exact path='/'>
              <Home convertRoman={convertRoman} />
            </Route>
            <Route exact path='/graphs'>
              <PieChartPage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
    display: flex;
    padding: 8px 10%;
    flex-direction: column;
`
const contentStyle = css`
  display: flex;
  justify-content:center;
  margin: 10px;
`
