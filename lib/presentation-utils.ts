export function presentationThumbnailUrl(seed: string) {
  return `https://api.dicebear.com/9.x/glass/svg?seed=${encodeURIComponent(seed)}`
}

export function toInternalPath(maybeUrl: string | undefined): string | null {
  if (!maybeUrl) return null
  if (maybeUrl.startsWith('/')) return maybeUrl

  try {
    const url = new URL(maybeUrl)
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return null
  }
}
