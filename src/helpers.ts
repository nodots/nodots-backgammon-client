export const uuidFromUrl = (url: string): string => {
  const urlPieces = url.split('/')
  return urlPieces[urlPieces.length - 1]
}
