import { css } from '@emotion/core'

export const styles = css`
  width: 900px;
  height: 650px;

  .data{
    height: 100%;
    width: 100%;
    display: flex;
  }

  .legend{
    font-size: 24px;

    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .left{
      display: flex;
      align-items: center;
    }
    .color-box{
      height: 16px;
      width: 16px;
    }
    p{
      margin: 0 16px 0 8px;
    }
  }
`
