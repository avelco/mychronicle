import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing"; // Your next-intl routing config

const intlMiddleware = createMiddleware(routing);

// Update route matchers to include locale prefix
const isPublicRoute = createRouteMatcher(["/:locale/public-route-example"]);
const isPrivateRoute = createRouteMatcher([
  "/admin/(.*)",
  "/api(.*)",
]);
const isDashboardRoute = createRouteMatcher(["/:locale/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  // If it's a private route (onboarding/admin), skip i18n middleware
  if (isPrivateRoute(req)) {
    return NextResponse.next();
  }

  // Redirect to onboarding if not complete (with locale)
  if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
    // Extract locale from path (e.g., /en/dashboard -> en)
    const locale = req.nextUrl.pathname.split('/')[1] || 'en';
    
    // Check if we are already on the onboarding page to avoid infinite loop
    if (!req.nextUrl.pathname.includes('/onboarding')) {
      const onboardingUrl = new URL(`/${locale}/onboarding`, req.url);
      return NextResponse.redirect(onboardingUrl);
    }
  }

  // If it's a dashboard route, require authentication before applying i18n
  if (isDashboardRoute(req)) {
    if (!isAuthenticated) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
    return intlMiddleware(req);
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!isAuthenticated && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // If authenticated and route is protected, apply intl middleware
  if (isAuthenticated && !isPublicRoute(req)) {
    return intlMiddleware(req);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
