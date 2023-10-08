import React, {
  useState,
  useMemo,
  createContext,
  useCallback,
  useEffect,
} from "react"

/* enum which we use to set and
 * identify the pages in our router
 */
enum PAGES {
  HOME = "home",
  SEARCH = "search",
  WEATHER = "weather",
  ERROR = "error",
}

const PAGES_MAP = {
  [PAGES.HOME]: "home",
  [PAGES.SEARCH]: "search",
  [PAGES.WEATHER]: "weather",
  [PAGES.ERROR]: "error",
}

export interface IRoutingContext {
  page: string
  setPage: (_: string) => void
  history: {
    push: () => void
    back: () => void
    go: (page: string) => void
    currentPage: string
    pages: typeof PAGES_MAP
  }
}

export const RoutingContext = createContext({
  page: PAGES.HOME,
  setPage: (_: string) => {},
  history: {
    push: () => {},
    back: () => {},
    go: (_: string) => {},
    currentPage: "",
    pages: PAGES_MAP,
  },
} as IRoutingContext)

export default function Router({ children }: { children: React.ReactNode }) {
  const [urlPath, setUrlPath] = useState<string>("")
  const [page, setPage] = useState(urlPath)
  const [pageStack, setPageStack] = useState<string[]>([])

  /* LOGGER */
  console.log("pageStack", { pageStack, urlPath, page })

  useEffect(() => {
    const path = window.location.pathname.slice(1).toLowerCase()
    setUrlPath(path)
  }, [])

  /* Add the current page to the stack */
  const push = useCallback(() => {
    setPageStack((prev) => [...prev, page])
    setPage(page)
  }, [page])

  const back = useCallback(() => {
    if (pageStack.length > 1) {
      setPageStack((prev) => prev.slice(0, -1))
    }

    setPage(pageStack[pageStack.length - 1])
  }, [pageStack])

  const go = useCallback((page: string) => {
    setPage(page)
  }, [])

  const value = useMemo(
    () => ({
      currentPage: page,
      history: {
        push,
        back,
        go,
        currentPage: page,
        pages: PAGES_MAP,
      },
    }),
    [back, go, page, push],
  )

  /* Automatically react to route on window.location change outside of this context */
  useEffect(() => {
    window.addEventListener("popstate", () => {
      setPageStack((prev) => prev.slice(0, -1))
      setPage(window.location.pathname.slice(1).toLowerCase())
    })

    console.log("popstate", { pageStack, page, urlPath })
    return () => {
      window.removeEventListener("popstate", () => {})
    }
  }, [page, pageStack, urlPath])

  return (
    <RoutingContext.Provider value={{ ...value, page, setPage }}>
      {children}
    </RoutingContext.Provider>
  )
}
