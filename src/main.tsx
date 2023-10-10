import React, { Children } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import "./index.css"
import store from "@/app/store"
import { RouterProvider } from "react-aria"
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import { HomeScreen } from "@/screens/home-screen"
import { SearchScreen } from "@/screens/search-screen"
import { WeatherScreen } from "@/screens/weather-screen"
import { styled } from "@linaria/react"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
