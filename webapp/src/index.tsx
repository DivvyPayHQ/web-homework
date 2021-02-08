import React from "react";
import ReactDOM from "react-dom";
import { Global, css } from "@emotion/react";

import App from "./App";
import { ErrorBoundary } from "./ErrorBoundary";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
          font-size: inherit;
        }

        html {
          font-size: 62.5%;
        }

        body {
          box-sizing: border-box;
          font-family: "Roboto", "Open Sans", sans-serif;
        }
      `}
    />
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
