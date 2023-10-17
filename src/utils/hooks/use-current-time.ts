import { DateTime } from "luxon"
import { useCallback, useEffect, useState } from "react"

/**
 * Generates the current time based on the given offset and starting time.
 *
 * @param {number} offset - The number of seconds to add or subtract from the current time.
 * @param {number} starting - The starting time in seconds. If greater than 0, the current time will be set to this value.
 * @return {object} An object containing the formatted current time in "HH:mm" format and the current time as a DateTime object.
 */
export const useCurrentTime = ({
  offset,
  starting,
  constant = false,
}: {
  offset: number
  starting: number
  constant?: boolean
}) => {
  const [currentTime, setCurrentTime] = useState(DateTime.utc())

  useEffect(() => {
    if (constant) {
      setCurrentTime(DateTime.utc().plus({ seconds: starting + offset }))
      return
    }
    const id = setInterval(() => {
      setCurrentTime(DateTime.utc())
    }, 1000)

    return () => clearTimeout(id)
  }, [offset, starting, constant])

  return {
    formatted: useCallback(
      () =>
        currentTime.plus({ seconds: starting + offset }).toFormat("HH:mm:ss"),
      [currentTime, offset, starting],
    ),
    currentTime,
  }
}
