import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const session = await auth()

  const protectedRoutes = [
    '/addDonation',
    '/addExpense'
  ]

  const isProtected = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !session?.user) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/donations',
    '/expenses',
    '/addDonation',
    '/addExpense'
  ],
}
