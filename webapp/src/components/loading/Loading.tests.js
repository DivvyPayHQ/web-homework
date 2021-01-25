import React from "react"
import renderer from "react-test-renderer"
import { ThemeProvider } from '@emotion/react'
import { Loading } from "./"
import { theme } from '../../styles/theme'

describe("Loading", () => {
  const component = (
    <ThemeProvider theme={theme}>
      <Loading />
    </ThemeProvider>
  )

  it("renders successfully and matches snapshot", () => {
    const mounted = renderer.create(component).toJSON()
    expect(mounted).toMatchSnapshot()
  })
})
