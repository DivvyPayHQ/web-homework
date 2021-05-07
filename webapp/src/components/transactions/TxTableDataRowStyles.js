import { css } from '@emotion/core'

export const styles = css`
  cursor: pointer;
  position: relative;

  &:nth-child(odd) {
    background-color: lightblue;
  }

  &:hover {
    background-color: lightgray;
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 2px 6px;
  }
  button.delete {
    background-color: red;
  }

  td {
    padding: 0 2px;
  }
  td.currency {
    text-align: right;
    padding-left: 12px;
  }
  td.check {
    text-align: center;
  }

  .edit-menu-container {
    position: relative;
  }
  .edit-menu {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    width: 145px;
    background-color: #DDD;
    padding: 2px;
    border-radius: 4px;
    box-shadow: black 1px 1px 1px;
  }
  .edit-img {
    height: 16px;
  }
  .edit-menu-cancel {
    background-color: black;
    color: white;
  }
  .edit-menu-cancel, .edit-menu-edit, .edit-menu-delete{
    cursor: pointer;
  }
  .edit-menu-delete {
    margin-left: 6px;
    background-color: red;
  }
`
