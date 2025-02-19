export const accountEllipsis = (address: string | null | undefined) => {
  return address ? `${address.substring(0, 8)}...${address.substring(address.length - 8)}` : null
}