import { createRoot } from 'react-dom/client'
import'./index.css'
import App from './app/App.tsx'
import {BrowserRouter} from "react-router-dom";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";
import {ThemeProvider} from "./context/ThemeContext.tsx";
import {Provider} from "react-redux";
import ichgramStore from "./store/ichgramStore.ts";
import {ImageProvider} from "./context/ImageContext.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={ichgramStore}>
        <BrowserRouter>
            <ImageProvider>
                <ThemeProvider>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <App/>
                    </DevSupport>
                </ThemeProvider>
            </ImageProvider>
        </BrowserRouter>
    </Provider>
)
