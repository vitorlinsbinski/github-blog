import { defaultTheme } from "./styles/themes/default";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";

import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";

import { UserProvider } from "./contexts/ProfileContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <UserProvider>
          <Router></Router>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}
