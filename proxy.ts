import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing' // Your next-intl routing config

const intlMiddleware = createMiddleware(routing)

// Update route matchers to include locale prefix
const isOnboardingRoute = createRouteMatcher(['/:locale/onboarding'])
const isPublicRoute = createRouteMatcher(['/:locale/public-route-example'])

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth()

  // Extract locale from pathname
  const locale = req.nextUrl.pathname.split('/')[1]

  // For users visiting /onboarding, don't try to redirect
  if (isAuthenticated && isOnboardingRoute(req)) {
    return intlMiddleware(req)
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url })
  }

  // Redirect to onboarding if not complete (with locale)
  if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL(`/${locale}/onboarding`, req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  // If authenticated and route is protected, apply intl middleware
  if (isAuthenticated && !isPublicRoute(req)) {
    return intlMiddleware(req)
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}