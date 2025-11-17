import { clerkMiddleware } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const nextIntlMiddleware = createMiddleware(routing);

export default clerkMiddleware((auth, req) => {

  return nextIntlMiddleware(req);
});

export const config = {
  matcher: [
    // Internationalized pathnames that need i18n processing
    '/', 
    '/(es|en)/:path*', 
    // Clerk's required paths for API/trpc/internal routes, ensuring auth runs on those
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};