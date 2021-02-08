import React from "react";
import { FieldHookConfig, useField } from "formik";
import styled from "@emotion/styled";

import { isNotUndefined } from "src/utils/typeGuards";

/**
 * Styles
 */

const WrapperS = styled.div<{ hasErrors: boolean }>`
  position: relative;
  margin-bottom: 16px;

  label {
    display: inline-block;
    color: ${(props) => (props.hasErrors ? "#f48fb1" : "#8d8d8d")};
    font-size: 1rem;
    pointer-events: none;
    margin-bottom: 4px;
  }

  input {
    padding: 14.5px 10px;
    font: inherit;
    color: currentColor;
    width: 100%;
    border-color: ${(props) => (props.hasErrors ? "#f48fb1" : "#d8d8d8")};
    border-radius: 4px;
    border-style: solid;
    height: 1.1876em;
    margin: 0;
  }
`;

/**
 * Types
 */

type GenericFieldSubset = FieldHookConfig<string> & JSX.IntrinsicElements["input"];

type TextFieldProps = {
  label: string;
} & GenericFieldSubset;

/**
 * Helpers
 */

const mkLabel = ({ label, required }: { label: string; required: boolean }) => {
  if (required) {
    return `${label} *`;
  } else {
    return label;
  }
};

/**
 * Components
 */

export function TextField(props: TextFieldProps): JSX.Element {
  const { id, label, name, required, ...rest } = props;
  const [field, meta] = useField<string>(props);

  const hasErrors: boolean = meta.touched && isNotUndefined(meta.error);

  return (
    <WrapperS hasErrors={hasErrors}>
      <label htmlFor={id || name}>{mkLabel({ label, required: required ?? false })}</label>
      <input type="text" {...field} {...rest} />
    </WrapperS>
  );
}
