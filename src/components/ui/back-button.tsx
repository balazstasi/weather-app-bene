import { Back } from "@/_assets/Back"
import { SvgIcon as SVG } from "@/components/composed/weather-info"
import { styled } from "@linaria/react"
import { useNavigate } from "react-router-dom"

const SvgIcon = styled(SVG)`
  color: var(--steel-blue);
  &:hover {
    color: var(--powder-blue);
  }
  &:active {
    color: var(--powder-blue);
    transform: translateY(2px);
    transition: translateY 0.1s ease-in;
  }
  position: absolute;
  top: 8px;
  left: calc(25% + 48px);
`

export const BackButton = () => {
  const navigate = useNavigate()
  return (
    <SvgIcon onClick={() => navigate(-1)}>
      <Back />
    </SvgIcon>
  )
}
