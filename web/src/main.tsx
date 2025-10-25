import { createRoot } from "react-dom/client";
import Router from "./router/Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./lib/theme.lib.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);
