import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function App () {
  return (
    <>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  )
}

export default App
