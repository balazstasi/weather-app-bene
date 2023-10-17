import { DateTime } from "luxon"

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
}: {
  offset: number
  starting: number
}): object => {
  let currentTime = DateTime.utc()
  if (starting > 0) {
    currentTime = DateTime.fromSeconds(starting)
  }
  currentTime = currentTime.plus({ seconds: offset })

  return {
    formatted: currentTime.toFormat("HH:mm"),
    currentTime,
  }
}
