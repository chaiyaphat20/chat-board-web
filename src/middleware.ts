import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { AppConfig } from './utils/Appconfig'

const publicPages = ['/login', '/', '/home', '/home/.*']
const intlMiddleware = createIntlMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
})

const authMiddleware = withAuth(req => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/login',
  },
})

export default function middleware(req: NextRequest) {
  // ตรวจสอบการเข้าหน้า locale โดยตรง เช่น /th, /en
  const localePathMatch = /^\/([a-z]{2})$/i.exec(req.nextUrl.pathname)
  if (localePathMatch) {
    const locale = localePathMatch[1]
    return NextResponse.redirect(new URL(`/${locale}/home`, req.url))
  }

  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  const publicPathnameRegex = RegExp(
    `^(?:/(${AppConfig.locales.join('|')}))?(${publicPages.join('|')})/?$|^/$`,
    'i'
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (req.nextUrl.pathname === '/login') {
    const token =
      req.cookies.get('next-auth.session-token')?.value ||
      req.cookies.get('__Secure-next-auth.session-token')?.value
    if (token) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  if (isPublicPage) {
    return intlMiddleware(req)
  } else {
    return (authMiddleware as any)(req)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.svg$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
}
