import React from "react";

/**
 * Types
 */

export interface ErrorProps {
  message?: string;
  title?: string;
}

/**
 * Component
 */

export function Error(props: ErrorProps): JSX.Element {
  const { message = "Well this is embarrassing... ¯\\_(ツ)_/¯", title = "Oops!" } = props;

  return (
    <div>
      <h1>{title}</h1>
      <span>{message}</span>
    </div>
  );
}
