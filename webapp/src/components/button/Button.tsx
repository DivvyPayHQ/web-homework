import React from "react";
import styled from "@emotion/styled";

/**
 * Styles
 */

const ButtonS = styled.button`
  display: inline-flex;
  color: rgba(0, 0, 0, 0.87);
  background-color: #90caf9;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%),
    0px 1px 5px 0px rgb(0 0 0 / 12%);
  padding: 6px 16px;
  min-width: 64px;
  font-size: 0.874rem;
  letter-spacing: 0.02857em;
  border-radius: 4px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  border: 0;
  cursor: pointer;
  outline: 0;
  align-items: center;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
`;

/**
 * Types
 */

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Components
 */

export function Button(props: ButtonProps): JSX.Element {
  const { children, onClick, ...rest } = props;

  return (
    <ButtonS onClick={onClick && onClick} {...rest}>
      <span>{children}</span>
    </ButtonS>
  );
}
