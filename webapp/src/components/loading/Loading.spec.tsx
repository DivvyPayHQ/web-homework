import React from "react";
import { render } from "@testing-library/react";

import { Loading } from "./Loading";

describe("[Component] Loading", () => {
  it("should match snapshot", () => {
    const { container } = render(<Loading />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
