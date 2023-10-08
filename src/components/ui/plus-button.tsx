import { styled } from "@linaria/react"

// It should be a big green plus button
const PlusIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #58bc49;
  height: 32px;
  width: 32px;
  background-color: transparent;
  border: none;
  font-size: 120px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  &:hover {
    filter: drop-shadow(0 0 32px #58bc49);
    transition: all 0.2s ease-in-out;
    transform: scale(1.05);
    color: #b3f0ac;
    &:active {
      color: #fff;
      transition: all 0.05s ease-in-out;
      transform: scale(1);
      filter: none;
    }
  }
`

type PlusButtonProps = {
  onClick: () => void
}
export const PlusButton = (props: PlusButtonProps) => {
  return <PlusIcon onClick={props.onClick}>+</PlusIcon>
}
