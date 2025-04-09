// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// console.log(matchers);

// export default clerkMiddleware((auth, req) => {
//   // if (isProtectedRoute(req)) auth().protect()

//   const { sessionClaims } = auth();

//   const role = (sessionClaims?.metadata as { role?: string })?.role;
//   for (const { matcher, allowedRoles } of matchers) {
//         if (matcher(req) && !allowedRoles.includes(role!)) {
//           return NextResponse.redirect(new URL(`/${role}`, req.url));
//         }
//       }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

// ============================================================================================

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";
import { NextResponse } from "next/server";

const matchers = Object.keys(routeAccessMap).map((route) => ({
  matcher: createRouteMatcher([route]),
  allowedRoles: routeAccessMap[route],
}));

console.log(matchers);

export default clerkMiddleware(async (auth, req) => {
  // if (isProtectedRoute(req)) auth().protect()

  const { sessionClaims } = await auth();

  const role = (sessionClaims?.metadata as { role?: string })?.role;
  for (const { matcher, allowedRoles } of matchers) {
    if (matcher(req) && !allowedRoles.includes(role!)) {
      return NextResponse.redirect(new URL(`/${role}`, req.url));
    }
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

// ===========================================================================================

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// console.log(matchers);

// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req) && !allowedRoles.includes(role!)) {
//       return NextResponse.redirect(new URL(`/${role}`, req.url));
//     }
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

//20241118_01 ======================================================================================================

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { routeAccessMap } from "./lib/settings";
// import { NextResponse } from "next/server";

// const matchers = Object.keys(routeAccessMap).map((route) => ({
//   matcher: createRouteMatcher([route]),
//   allowedRoles: routeAccessMap[route],
// }));

// export default clerkMiddleware(async (auth, req) => {
//   const { sessionClaims } = await auth();
//   const role = (sessionClaims?.metadata as { role?: string })?.role;

//   // Role-based route restriction
//   for (const { matcher, allowedRoles } of matchers) {
//     if (matcher(req) && !allowedRoles.includes(role!)) {
//       return NextResponse.redirect(new URL(`/${role}`, req.url));
//     }
//   }

//   // Add role to response headers for use in other parts of the app
//   const res = NextResponse.next();
//   if (role) {
//     res.headers.set("x-user-role", role);
//   }

//   return res;
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
