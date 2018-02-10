const capitalize = (str: string): string => {
  const trimmedStr = str.trim()
  return trimmedStr.charAt(0).toUpperCase() + trimmedStr.slice(1)
}

export default capitalize
