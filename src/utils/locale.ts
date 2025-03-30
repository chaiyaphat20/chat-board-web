export const getActivePath = (pathname: string, locales: string[] = ['en', 'th']) => {
  if (pathname === '/') return 'home'

  const segments = pathname.split('/').filter(segment => segment !== '')

  if (segments.length === 0) return 'home'

  if (segments.length > 0 && locales.includes(segments[0])) {
    if (segments.length === 1) return 'home'
    return segments[1]
  }
  return segments[0]
}
