import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { TextField } from "./TextField";

describe("[Component] Input", () => {
  const onSubmit = jest.fn();

  it("should be disabled", () => {
    render(
      <Formik initialValues={{ email: "" }} onSubmit={onSubmit}>
        {(): React.ReactNode => (
          <Form>
            <TextField
              autoComplete="username"
              data-testid="username"
              disabled
              id="email"
              label="Email"
              name="email"
              type="email"
            />
          </Form>
        )}
      </Formik>,
    );

    const el = screen.getByTestId("username");

    expect(el).toHaveAttribute("disabled");
  });

  it("should handle validation errors", async () => {
    render(
      <Formik
        initialValues={{ email: "" }}
        onSubmit={onSubmit}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Please enter a valid email address").required(),
        })}>
        {(): React.ReactNode => (
          <Form>
            <TextField
              autoComplete="username"
              data-testid="username"
              id="email"
              label="Email"
              name="email"
            />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>,
    );

    const inputEl = screen.getByTestId("username");
    const btnEl = screen.getByText("Submit");

    userEvent.click(btnEl);

    await waitFor(() => {
      expect(inputEl).toHaveStyle({
        "border-color": "#f48fb1",
      });
    });
  });

  it("should match snapshot", () => {
    const { container } = render(
      <Formik initialValues={{ email: "" }} onSubmit={onSubmit}>
        {(): React.ReactNode => (
          <Form>
            <TextField autoComplete="username" id="email" label="Email" name="email" type="email" />
          </Form>
        )}
      </Formik>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
