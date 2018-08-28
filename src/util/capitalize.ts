/**
 * Capitalize a string
 * @param str  A string that may or may not be capitalized.
 * @returns    A capitalized string.
 */
const capitalize = (str: string): string => {
  const trimmedStr = str.trim()
  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1)
}

export default capitalize
