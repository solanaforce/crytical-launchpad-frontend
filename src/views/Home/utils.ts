export const getMcapString = (m: number) => {
  if (m > 1e6)
    return `$${Math.floor(m/1e6)}M`
  if (m > 1e3)
    return `$${Math.floor(m/1e3)}K`
  return `$${m}`
}

export const getCreditString = (m: number) => {
  if (m > 1e6)
    return `${Math.floor(m/1e6)}M`
  if (m > 1e3)
    return `${Math.floor(m/1e3)}K`
  return `${m}`
}