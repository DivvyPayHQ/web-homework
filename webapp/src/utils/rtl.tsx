import React from "react";
import { RenderOptions, RenderResult, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ErrorBoundary } from "src/ErrorBoundary";

/**
 * Components
 */

function AllTheProviders(props: { children?: React.ReactNode }): JSX.Element {
  const { children } = props;

  return (
    <ErrorBoundary>
      <MemoryRouter>{children}</MemoryRouter>
    </ErrorBoundary>
  );
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">,
): RenderResult {
  return render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
