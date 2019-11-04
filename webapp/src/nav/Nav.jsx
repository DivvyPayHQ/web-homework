import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'

const Nav = () => (
  <header css={layoutStyle}>
    <nav css={navStyle}>
      <Link css={logoStyle} to='/'>
        {/* <svg enableBackground='new 0 0 50 50' height='50px' id='Layer_1' version='1.1' viewBox='0 0 50 50' width='50px' x='0px' xmlSpace='preserve' xmlns='http://www.w3.org/500/svg' xmlnsXlink='http://www.w3.org/1999/xlink' y='0px'>
          <image height='50' href='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAMAAAC3Ycb+AAAABGdBTUEAALGPC/xhBQAAACBjSFJN AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAC31BMVEX////+/v79/f38/Pz6 +vr7+/vu7u7b29vDw8OkpKSDg4NnZ2daWlpTU1NQUVBVVVVeXl5xcXGQkJCwsLDNzc3i4uL29vbo 6OjV1dW8vLygoKCFhYVubm5jY2NhYWF7e3uUlJSysrLg4ODz8/PX19eioqJvb287OzsREREAAAAg ICBNTU2CgoLs7Oz39/e/v7+Ojo5dXV0tLS0FBQUcHBxGRkZ6enqrq6udnZ1QUFAfHx8EBAQDAwMC AgIxMTHCwsLT09N3d3c6OjoNDQ0nJydZWVmqqqrl5eWEhIQBAQEMDAz09PT5+fm+vr5LS0sQEBAm Jibq6urj4+MVFRU2Nja7u7tMTEyPj4+fn59OTk7IyMjY2Ng1NTWoqKhRUVEUFBSZmZlbW1sdHR1J SUne3t4lJSW6uroiIiLAwMDS0tI3NzcICAiSkpJoaGgPDw+srKy9vb0bGxtycnIGBga2trYODg6m pqYWFhbPz88qKiqcnJw5OTnr6+tSUlLGxsaLi4swMDBsbGyGhobOzs4KCgp1dXWvr69CQkLHx8cj IyPa2tqenp4/Pz8uLi6ampr4+PilpaW1tbXKyso9PT3y8vLh4eETExOurq7c3NxWVlZKSkr19fVl ZWUzMzPBwcEXFxd/f38ZGRkSEhK0tLShoaHd3d3t7e2Xl5eRkZHm5uYpKSmYmJiWlpbw8PCzs7PF xcVISEjR0dFkZGR2dnZra2t5eXmnp6cHBwc4ODgyMjKIiIhHR0dDQ0OpqanZ2dkYGBgsLCw+Pj5A QEDExMRqamoJCQmJiYnv7+9BQUEkJCRYWFi3t7c0NDRzc3OVlZWNjY1cXFweHh5fX1+BgYHk5OQ8 PDyHh4dUVFSxsbG4uLiTk5NiYmJwcHBgYGAaGhqjo6Pn5+crKyuKioqtra3x8fFPT0/Q0NBtbW3L y8vp6embm5tFRUV8fHx0dHQvLy+5ubkLCwvW1tZERER9fX3U1NSuOnWdAAAAAWJLR0QAiAUdSAAA AAd0SU1FB+MLAwsTBr24VjUAAA71SURBVHja7d2JnxTFFQfwV9XTHIJBkVMwKotKEXYjDCLY3SBB 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' id='image0' width='50' x='0' y='0' />
        </svg> */}
        <img alt='Divvy logo' id='divvy-logo' src='https://app.divvy.co/assets/icons/firefox_app_512x512.png' />
      </Link>
      <ul >
        <li>
          <Link to='/'>DASHBOARD</Link>
        </li>
        <li>
          <Link to='/report'>REPORT</Link>
        </li>
      </ul>
    </nav>
    <div css={userLayout}>
      USER
    </div>
  </header>
)

const layoutStyle = css`
  background-color: #000000;
  color: #ffffff;
  display: grid;
  grid-template-columns: 80% 20%;
  padding: 20px 25px;
`

const navStyle = css`
  align-items: center;
  display: grid;
  grid-template-columns: 7% 93%;
  
  & > ul {
    display: flex;
    flex-direction: row;
    list-style-type: none;

    a {
      color: #ffffff;
      font-size: 12px;
      font-weight: bold;
      text-decoration: none;

      &:hover,
      &:focus {
        opacity: 0.8;
      }
    }
  }
  
  & > ul > li:not(:first-child) {
    margin-left: 16px;
  }
`

const userLayout = css`
  align-items: center;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: flex-end;
`

const logoStyle = css`
  height: 50px;

  #divvy-logo {
    height: 50px;
  }
`

export default Nav
