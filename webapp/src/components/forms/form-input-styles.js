import { css } from '@emotion/react'

export const formInputStyle = (width) => css`
width: auto;

.group {
  position: relative;
  display: flex;
}

  .form-input {
    background: none;
    background-color: white;
    color: grey;
    font-size: 2vw;
    padding: 10px 10px 10px 5px;
    border: none;
    border-bottom: 1px solid grey;
    margin: 0px 5px;
    &:focus {
      outline: none;
    }
  }


  .form-input:focus ~ .form-input-label {
    left: -${width}px;
    font-size: 12px;
    color: black;
    opacity: 0
  }

  .form-input-label {
    color: grey;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;
  }

  .form-input-label.shrink {
    font-size: 12px;
    color: black;
    opacity: 0
  } 


`
