import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const AUTH_ROUTES = ['/auth/login', '/auth/register'] as const
const JWT_SECRET = process.env.NEXT_JWT_SECRET as string
const DASHBOARD_PATH = '/dashboard'
const LOGIN_PATH = '/auth/login'
const DASHBOARD_REDIRECT = '/dashboard/perfil'

async function verifyAndHandleToken(token: string) {
  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return true
  } catch {
    return false
  }
}

/**
 * Middleware principal de autenticación
 */
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('cookie-token')
  const currentPath = request.nextUrl.pathname

  // Manejo de rutas de autenticación
  if (AUTH_ROUTES.includes(currentPath as any)) {
    if (token) {
      const isValid = await verifyAndHandleToken(token.value)
      if (isValid) {
        return NextResponse.redirect(new URL(DASHBOARD_REDIRECT, request.url))
      }
      // Si el token no es válido, lo eliminamos
      const response = NextResponse.next()
      response.cookies.delete('cookie-token')
      return response
    }
    return NextResponse.next()
  }

  // Protección de rutas del dashboard
  if (currentPath.startsWith(DASHBOARD_PATH)) {
    if (!token) {
      return NextResponse.redirect(new URL(LOGIN_PATH, request.url))
    }

    const isValid = await verifyAndHandleToken(token.value)
    if (!isValid) {
      const response = NextResponse.redirect(new URL(LOGIN_PATH, request.url))
      response.cookies.delete('cookie-token')
      return response
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/login', '/auth/register']
}
// MATCHER ->
