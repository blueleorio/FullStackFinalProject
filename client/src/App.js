import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme";
import { LocalizationProviderWrapper } from "./contexts/LocaleContext.js";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <LocalizationProviderWrapper>
            <Router />
          </LocalizationProviderWrapper>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
