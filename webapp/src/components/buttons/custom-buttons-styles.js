import { css } from '@emotion/react'

export const CutomButtonStyles = css`
padding: 15px;
width: 26px;

  .button {
      border-radius: 4px;
  }
 
  .button1 {
      background: #00447c;
      position: relative;
      height: 100%;
  }
 
  .active {
      animation-name: active;
      animation-duration: .2s;
      animation-timing-function: ease-in-out;
  }
 
  @keyframes active {
      0% {
          top: -5px;
      }
 
      30% {
          top: -1px;
      }
 
      40% {
          top: 0px;
      }
 
      60% {
          top: 0px;
      }
 
      90% {
          top: -7px;
      }
 
      100% {
          top: -5px;
      }
  }
 
  .button2 {
      background: #0067b7;
      position: relative;
      top: -2px;
      height: 100%;
  }
 
  .button3 {
      background: linear-gradient(#40a8f8, #2791e3);
      top: -5px;
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
      font-size: 1rem;
  }

}
`
