import { createContext, useContext, useState } from "react"

interface INavigationContext {
  navigate: (_: string) => void
  pathName: string
  lastPathName: string
}

export const NavigationContext = createContext({
  navigate: (_: string) => {},
  pathName: "",
  lastPathName: "",
} as INavigationContext)

type NavigationProviderProps = {
  children: React.ReactNode
}
export function NavigationProvider({ children }: NavigationProviderProps) {
  const [pathName, setPathName] = useState<string>("")
  const [lastPathName, setLastPathName] = useState<string>("")

  const navigate = (newPathName: string) => {
    setLastPathName(pathName)
    setPathName(newPathName)
    window.history.pushState({}, "", newPathName)
  }

  window.onpopstate = () => {
    setPathName(window.location.pathname)
  }

  return (
    <NavigationContext.Provider value={{ navigate, pathName, lastPathName }}>
      {children}
    </NavigationContext.Provider>
  )
}
type RouteProps = {
  children: React.ReactNode
  href: string
}
const Route = ({ children, href }: RouteProps) => {
  const navObject = useContext(NavigationContext)

  const pathName = { ...navObject }.pathName

  switch (pathName) {
    case href:
      return children
    default:
      return null
  }
}

export default Route
