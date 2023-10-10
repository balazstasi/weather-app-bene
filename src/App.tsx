import React, { useContext } from "react"
import "./App.css"
import { styled } from "@linaria/react"
import { Outlet, Route, Routes } from "react-router-dom"
import { HomeScreen } from "@/screens/home-screen"
import { SearchScreen } from "@/screens/search-screen"
import { WeatherScreen } from "@/screens/weather-screen"

const Theme = styled.div`
  height: 100vh;
  background-color: var(--background);
  color: var(--steel-blue);
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`

const App = () => {
  return (
    <Theme>
      <Routes>
        <Route index element={<HomeScreen />} />
        <Route path="search" element={<SearchScreen />} />
        <Route path="weather/:city" element={<WeatherScreen />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Theme>
  )
}

export default App
