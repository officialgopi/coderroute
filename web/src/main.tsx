import { createRoot } from "react-dom/client";
import Router from "./router/Router.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useThemeStore } from "./lib/theme.lib.tsx";
import { Toaster } from "sonner";

const ToastBar = () => {
  const { theme } = useThemeStore();
  return <Toaster position="bottom-right" theme={theme} />;
};

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter>
      <ToastBar />
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);
