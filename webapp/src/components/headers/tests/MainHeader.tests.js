import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from '@emotion/react'
import { MainHeader } from "../"
import { theme } from '../../../styles/theme'

describe("MainHeader", () => {
  const component = (
    <ThemeProvider theme={theme}>
      <MainHeader />
    </ThemeProvider>
  )

  it("renders successfully and matches snapshot", () => {
    const mounted = renderer.create(component).toJSON()
    expect(mounted).toMatchSnapshot()
  })
})
