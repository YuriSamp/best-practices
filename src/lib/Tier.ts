export const handleTier = (price: number) => {
  let tokens = 0

  switch (price) {
    case 500:
      tokens = 10000
      break
    case 1500:
      tokens = 30000
      break
    case 3000:
      tokens = 70000
      break
  }
  return tokens
}
