import { AppRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { AppThemeProvider } from "./shared/contexts";

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppThemeProvider>
  )
};
