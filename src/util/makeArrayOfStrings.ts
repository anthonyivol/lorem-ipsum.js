/**
 * Makes an array of strings that is a specified length.
 * 
 * @param length  The 'length' of the array to create.
 * @returns       An array of strings that is the specified 'length'. 
 */
const makeArrayOfStrings = (
  length: number,
  makeString: () => string
): string[] => {
  let cursor = 0
  const result = []
  while (cursor < length) {
    result.push(makeString())
    cursor++
  }
  return result
}

export default makeArrayOfStrings
