import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeProvider from "./theme";
import { CursorifyProvider } from "@cursorify/react";
import { EmojiCursor } from "./components/EmojiCursor.js";
function App() {
  return (
    <CursorifyProvider delay={4} cursor={<EmojiCursor />}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </CursorifyProvider>
  );
}

export default App;
