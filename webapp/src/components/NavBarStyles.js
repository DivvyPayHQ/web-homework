import { css } from '@emotion/core'

export const navbar = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #34495e;
  opacity: .90;
  padding: 20px;

  .active-link {
    font-size: 20px;
    font-weight: 900;
    text-decoration: underline;
  }
`

export const navlink = css`
  color: #aacfd0;
  margin: 0 10px;
  text-decoration: none;
  :hover {
    color: white;
  }
}
`
export const title = css`
  color: #f4f7f7;
  font-size: 24px;
  font-weight: 900;
`
export const subtitle = css`
  color: #f4f7f7;
  font-size: 16px;
  font-weight: 700;
  margin-right: 10px;
`
