import { NavigationContext } from "@/utils/router/router"
import { RoutingContext } from "@/utils/router/use-router"
import { useContext } from "react"

export const BackButton = () => {
  const { navigate, lastPathName } = useContext(NavigationContext)

  const BackButtonSvg = () => (
    <svg
      fill="currentColor"
      width="64px"
      height="64px"
      viewBox="0 0 52 52"
      data-name="Layer 1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g data-name="Group 132" id="Group_132">
        <path d="M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z" />
      </g>
    </svg>
  )

  return (
    <div
      onClick={navigate.bind(null, lastPathName)}
      style={{
        position: "fixed",
        left: -256,
        width: "100%",
        cursor: "pointer",
      }}
    >
      <BackButtonSvg />
    </div>
  )
}
