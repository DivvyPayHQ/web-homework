import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from '@emotion/react'
import { SecondaryHeader } from "../"
import { theme } from '../../../styles/theme'

describe("Loading", () => {
  const component = (
    <ThemeProvider theme={theme}>
      <SecondaryHeader />
    </ThemeProvider>
  )

  it("renders successfully and matches snapshot", () => {
    const mounted = renderer.create(component).toJSON()
    expect(mounted).toMatchSnapshot()
  })
})
