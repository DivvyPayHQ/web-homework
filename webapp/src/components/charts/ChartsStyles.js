import { css } from '@emotion/core'

export const styles = css`
  width: 70vw;
  height: 650px;

  .data {
    height: 100%;
    width: 100%;
    display: flex;
  }

  .legend-wrapper {
    margin-left: 32px;
  }

  .legend-container {
    border: 1px solid black;
    border-radius: 8px;
    padding: 16px;
    height: fit-content;
  }

  .legend {
    font-size: 20px;
    display: grid;
    grid-gap: 6px;
    grid-template-columns: 16px 1fr 120px 72px;
    grid-template-rows: 35px;
    align-items: center;

    p {
      margin: 0;
    }
    .color-box {
      height: 16px;
      width: 16px;
    }
    .name {
      margin-right: 8px;
    }
    .percent {
      text-align: right;
    }
    .amount {
      text-align: right;
    }
  }
`
