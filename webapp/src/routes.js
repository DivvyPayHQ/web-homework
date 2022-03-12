import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'

function AppRouter () {
  const [convertRoman, setConvertRoman] = useState(true)

  function handleClick () {
    setConvertRoman(!convertRoman)
  }

  return (
    <Router>
      <div css={layoutStyle}>
        <nav css={navStyle}>
          <ul >
            <li>
              <Link to='/'>Transactions</Link>
            </li>
            <li>
              |
            </li>
            <li>
              <Link to='/another'>Graphs</Link>
            </li>
          </ul>
          <div className='romanNumeral'>
            <div>Roman Numeral Converter</div>
            <input className='toggle' css={toggleStyle} onClick={handleClick} type='checkbox' />
          </div>
        </nav>
        <div className='main-content' css={contentStyle}>
          <Switch>
            <Route exact path='/'>
              <Home convertRoman={convertRoman} />
            </Route>
            <Route component={() => (<div>Content for /another route</div>)} exact path='/another' />
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const toggleStyle = css`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 62px;
  height: 32px;
  display: inline-block;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: #707070;
  transition: background-color ease 0.3s;
  transform: scale(.7);

:before {
  content: "   ";
  display: block;
  position: absolute;
  z-index: 2;
  width: 28px;
  height: 28px;
  background: #fff;
  left: 2px;
  top: 2px;
  border-radius: 50%;
  font: 10px/28px Helvetica;
  text-transform: uppercase;
  font-weight: bold;
  text-indent: -22px;
  word-spacing: 37px;
  color: #fff;
  text-shadow: -1px -1px rgba(0,0,0,0.15);
  white-space: nowrap;
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
  transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

:checked {
  background-color: #4CD964;
}

:checked:before {
  left: 32px;
}
`

const layoutStyle = css`
    display: grid;
    grid-row-gap: 24px;
    padding: 8px;
`

const navStyle = css`
  display: flex;
  justify-content: space-between;
  background: #40a8f8;
  padding: 10px 20px;
  background: linear-gradient(#40a8f8, #2791e3);

  .romanNumeral {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  a {
    text-decoration: none;
    color: white
  }

  & > ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
      color: white;
  }
  
  & > ul > li:not(:first-of-type) {
    margin-left: 16px;
  }
`

const contentStyle = css`
  grid-row: 2;
`
