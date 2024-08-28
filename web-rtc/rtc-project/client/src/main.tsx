import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./provider/theme-provider.tsx";
import { WebSocketProvider } from "./provider/socket-provider.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  //   <React.StrictMode>
  <WebSocketProvider url="ws://localhost:8080">
    <ThemeProvider defaultTheme="dark" storageKey="q2w-theme-ui">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </WebSocketProvider>
  //   </React.StrictMode>
);
