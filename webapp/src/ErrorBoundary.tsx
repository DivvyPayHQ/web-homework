import React from "react";

import { Error } from "./components/error/Error";

/**
 * Types
 */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ErrorBoundaryProps {}

interface State {
  hasError: boolean;
}

/**
 * Component
 */

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  state: State = {
    hasError: false,
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getDerivedStateFromError(_error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "production") {
      // report to Sentry/Rollbar/etc...
    }

    console.error(`[!] Error: ${error}\n[!] Info: ${errorInfo}`);
  }

  render(): React.ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    return hasError ? <Error /> : children;
  }
}
