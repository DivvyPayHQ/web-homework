import { css } from '@emotion/react'

export const CutomButtonStyles = css`
padding: 50px;
width: 200px;
height: 200px;

  .button {
      border-radius: 8px;
  }
 
  .button1 {
      background: #00447c;
      position: relative;
      height: 100%;
  }
 
  .active {
      animation-name: active;
      animation-duration: .25s;
      animation-timing-function: ease-in-out;
  }
 
  @keyframes active {
      0% {
          top: -15px;
      }
 
      30% {
          top: -2px;
      }
 
      45% {
          top: 0px;
      }
 
      55% {
          top: 0px;
      }
 
      90% {
          top: -20px;
      }
 
      100% {
          top: -15px;
      }
  }
 
  .button2 {
      background: #0067b7;
      position: relative;
      top: -10px;
      height: 100%;
  }
 
  .button3 {
      background: linear-gradient(#40a8f8, #2791e3);
      top: -15px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
  }
 
  .symbol {
      color: white;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      font-size: 5rem;
  }

}
`
