import { styled } from "@linaria/react"
import {
  Input as AriaInput,
  TextField as AriaTextField,
  Text,
} from "react-aria-components"

const TextField = styled(AriaTextField)`
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-text);
  padding: 0;
  font-size: 40px !important;
  color: var(--powder-blue);
`

const Input = styled(AriaInput)`
  /* Make it an underlined plain input with a bottom arrow on the :after */
  border: none;
  border-bottom: 1px solid var(--steel-blue);
  padding: 0;
  font-size: 40px;
  color: var(--color-text);
  width: 100%;
  min-width: 400px;
  font-size: 32px;
  background: none;
  outline: none;
  cursor: pointer;
  padding-right: 32px;
  /* Underline on active */
  &:focus {
    border-bottom: 1px solid var(--powder-blue);
    cursor: text;

    color: var(--color-text);
    &::after {
      content: "s" !important;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      pointer-events: none;
      color: var(--powder-blue);
    }
  }
`

const ArrowDown = styled.i`
  cursor: pointer;
  font-size: 40px;
  margin: auto;
  margin-left: -12px;
  padding: 10px;
  pointer-events: none;
  border: solid var(--color-text);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  color: var(--powder-blue);

  ${Input}:focus + & {
    color: var(--powder-blue);
    border-color: solid var(--powder-blue);
  }
`

type SearchInputProps = {
  value: string
  setValue: (value: string) => void
  errorMessage: string
}
export const SearchInput = (props: SearchInputProps) => {
  const { value, setValue, errorMessage } = props

  return (
    <TextField
      aria-errormessage={errorMessage}
      aria-label="Search City"
      aria-autocomplete="list"
    >
      <div style={{ display: "flex" }}>
        <Input
          id="cities"
          aria-autocomplete="list"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ArrowDown />
      </div>
      {errorMessage && (
        <Text slot="errorMessage" style={{ fontSize: "24px" }}>
          {errorMessage}
        </Text>
      )}
    </TextField>
  )
}
