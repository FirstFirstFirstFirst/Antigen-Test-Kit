import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { prisma } from "@/lib/db";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/clerk",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();

    // const userId = auth().userId;

    // const isAdmin = await checkUserIsAdmin(userId);

    // if (!isAdmin) {
    //   // Handle unauthorized admin access (redirect or 403)
    //   return new Response("Unauthorized", { status: 403 });
    // }
  } else if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
