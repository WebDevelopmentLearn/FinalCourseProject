import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import'./index.css'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {Provider} from "react-redux";
import ichgramStore from "./store/ichgramStore.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={ichgramStore}>
          <BrowserRouter>
              <ThemeProvider>
                  <DevSupport ComponentPreviews={ComponentPreviews}
                              useInitialHook={useInitial}
                  >
                      <App/>
                  </DevSupport>
              </ThemeProvider>
          </BrowserRouter>
      </Provider>
  </StrictMode>
)
