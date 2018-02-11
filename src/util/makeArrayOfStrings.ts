const makeArrayOfStrings = (
  num: number,
  makeString: () => string
): string[] => {
  return Array.apply(null, Array(num)).map(() => makeString())
}

export default makeArrayOfStrings
