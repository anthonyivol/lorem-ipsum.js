const makeArrayOfStrings = (
  num: number,
  makeString: () => string
): string[] => {
  let cursor = 0
  const result = []
  while (cursor < num) {
    result.push(makeString())
    cursor++
  }
  return result
}

export default makeArrayOfStrings
