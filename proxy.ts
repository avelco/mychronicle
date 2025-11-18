import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const isOnboardingRoute = createRouteMatcher(["/onboarding"]);
const isPublicRoute = createRouteMatcher(["/", "/(es|en)/"]);

const nextIntlMiddleware = createMiddleware(routing);

export default clerkMiddleware(async  (auth, req) => {
  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth();

  // For users visiting /onboarding, don't try to redirect
  if (isAuthenticated && isOnboardingRoute(req)) {
    return NextResponse.next();
  }

  // If the user isn't signed in and the route is private, redirect to sign-in
  if (!isAuthenticated && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url });

  // Catch users who do not have `onboardingComplete: true` in their publicMetadata
  // Redirect them to the /onboarding route to complete onboarding
  if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL("/onboarding", req.url);
    return NextResponse.redirect(onboardingUrl);
  }

  // If the user is logged in and the route is protected, let them view.
  if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next();

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    // Internationalized pathnames that need i18n processing
    "/",
    "/(es|en)/:path*",
    // Clerk's required paths for API/trpc/internal routes, ensuring auth runs on those
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
