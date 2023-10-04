import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App"
import { ContextProvider } from './contexts/ContextProvider';

import "react-toastify/dist/ReactToastify.css"
import "./styles/index.css"
import "./styles/tailwind.css"
import "./styles/titlebar.css"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <React.StrictMode>
        <ContextProvider>
            <App />
        </ContextProvider>
    </React.StrictMode>
)
