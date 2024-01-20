import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";
import {useMoveBack} from "./hooks/useMoveBack.js";
import {CookiesProvider} from "react-cookie";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace("/")}>
          <CookiesProvider defaultSetOptions={{httpOnly: true,path: '/'}}>

              <App />

          </CookiesProvider>


      </ErrorBoundary>
  </React.StrictMode>
);
