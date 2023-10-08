import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import Router from "@/utils/router/use-router"
import { NavigationProvider } from "@/utils/router/router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </Provider>
  </React.StrictMode>,
)
