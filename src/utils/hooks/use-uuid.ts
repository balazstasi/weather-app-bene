/** Inspiration/Better solutions: https://stackoverflow.com/questions/105034/how-do-i-create-a-guid-uuid#2117523 */
/** For RFC compatibility we need to use dates though */

// easiest and fast although not compliant -> This works if uniqueId is called only once per millisecond or more apart
export const generateQuickGuid = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

/**
 * Generates a random UUID.
 *
 * @return {string} The randomly generated UUID.
 */
export const UUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      // eslint-disable-next-line eqeqeq
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// More readable version which generated a UUID4 compliant one, as the number 4 should not be hardcoded, instead it
// should be randomly generated as well on the 13th place:
export const generateUUIDv4 = () => {
  const hexDigits = "0123456789abcdef"
  let uuid = ""

  for (let i = 0; i < 36; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid += "-"
    } else if (i === 14) {
      uuid += "4"
    } else if (i === 19) {
      // Either 8, 9, a, or b for uuid version 4
      uuid += hexDigits[(Math.random() * 4) | 8]
    } else {
      // Randomly generate a hex digit from 0 to 15
      uuid += hexDigits[Math.floor(Math.random() * 16)]
    }
  }

  return uuid
}
