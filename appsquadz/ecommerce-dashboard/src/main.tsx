import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import QueryProvider from "./components/provider/query-provider";
import StoreProvider from "./components/provider/store-provider";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </StoreProvider>
  </React.StrictMode>
);
