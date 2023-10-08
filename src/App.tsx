import React, { useContext, useEffect } from "react"
import "./App.css"
import { styled } from "@linaria/react"
import { HomeScreen } from "@/screens/home-screen"
import { SearchScreen } from "@/screens/search-screen"
import { WeatherScreen } from "@/screens/weather-screen"
import { RoutingContext } from "@/utils/router/use-router"
import Route, {
  NavigationContext,
  NavigationProvider,
} from "@/utils/router/router"

const Theme = styled.div`
  height: 100vh;
  background-color: var(--background);
  color: var(--steel-blue);
`

const App: React.FC = () => {
  const navigation = useContext(NavigationContext)

  return (
    <Theme className="App">
      <Route href={""}>
        <HomeScreen />
      </Route>
      <Route href={"search"}>
        <SearchScreen />
      </Route>
      <Route href={"weather"}>
        <WeatherScreen />
      </Route>
      {/* {history.pages.home === history.currentPage && <HomeScreen />}
      {history.pages.search === history.currentPage && <SearchScreen />}
      {history.pages.weather === history.currentPage && <WeatherScreen />}
      {history.pages.error === history.currentPage && <h1>Error</h1>} */}
    </Theme>
  )
}

export default App
