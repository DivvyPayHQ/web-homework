import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "./Button";

describe("[Component] Button", () => {
  it("should handle onClick", () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Click Me</Button>);

    userEvent.click(screen.getByText("Click Me"));

    expect(onClick).toHaveBeenCalled();
  });

  it("should match snapshot", () => {
    const { container } = render(<Button>Click Me</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
