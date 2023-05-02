import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const rolePageMap = {
  user: [
    "/user/home",
  ],

  GA: [
    "/automotive_group/dashboard",
    "/automotive_group/docs",
    "/automotive_group/home",
    "/automotive_group/settings",
    "/automotive_group/signup",
  ],
};

function isAuthorizedRole(role, url) {
  return rolePageMap[role]?.includes(url);
}

export default withAuth(
  async function middleware(req, res) {
    const { token } = await req.nextauth.session;
    const { pathname } = req.nextUrl;

    if (!token || !isAuthorizedRole(token.user?.role, pathname)) {
      // If the user is not authenticated or not authorized to access the requested URL,
      // redirect them to the NextAuth login page
      return NextResponse.redirect("/api/auth/signin");
    }
  },

  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },

    secret: process.env.NEXT_AUTH_SECRET,
  }
);

export const config = {
  matcher: [
    "/automotive_group/:path*",
    "/user/:path*",
  ],
};
