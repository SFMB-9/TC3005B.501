import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const rolePageMap = {
  user: [
    "/user/home",
  ],
  manager : [
    "",
  ],
  seller: [
    "",
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
    const token = req.nextauth?.session?.token;
    const { pathname } = req.nextUrl;

    if (!token) {
      // If the user is not authenticated, redirect them to the login page
      return NextResponse.redirect("http://localhost:3000/auth/login");
    }

    if (!isAuthorizedRole(token.user?.role, pathname)) {
      // If the user is not authorized to access the requested URL,
      // redirect them to the home page or show an error message
      return NextResponse.redirect("http://localhost:3000/");
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
