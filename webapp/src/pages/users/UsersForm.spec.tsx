import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import { CREATE_USER_MUTATION, UserForm } from "./UserForm";

const mockUser = {
  dob: "02/02/2021",
  firstName: "Temp",
  lastName: "User",
};

describe("[Form] UserForm", () => {
  it("should handle successful form submission", async () => {
    const mocks: Array<MockedResponse> = [
      {
        request: {
          query: CREATE_USER_MUTATION,
          variables: {
            ...mockUser,
          },
        },
        result: {
          data: {
            createUser: {
              ...mockUser,
            },
          },
        },
      },
    ];

    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <UserForm />
      </MockedProvider>,
    );

    await waitFor(() => {
      userEvent.type(screen.getByTestId("user-first-name"), mockUser.firstName);
      userEvent.type(screen.getByTestId("user-last-name"), mockUser.lastName);
      userEvent.type(screen.getByTestId("user-dob"), mockUser.dob);
      userEvent.click(screen.getByText(/submit/i));
    });
  });
});
