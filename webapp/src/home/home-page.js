import React from 'react'
import { css } from '@emotion/core'

import { Card } from 'src/home/Card'

export function Home () {
  return (
    <section css={containerStyle}>
      <Card color='green'>
        Hello
      </Card>
      <Card>
        World
      </Card>
      <Card color='blue'>
        Rocks
      </Card>
    </section>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`
