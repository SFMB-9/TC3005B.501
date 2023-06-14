import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const rolePageMap = {
  admin: ["/sa.*"],

  seller: ["/providers/seller.*"],
};

// function isAuthorizedRole(role, url) {
//   console.log(role);
//   return rolePageMap[role]?.includes(url);
// }

function isAuthorizedRole(role, url) {
  const allowedPaths = rolePageMap[role];

  if (!allowedPaths) {
    return false;
  }

  for (let path of allowedPaths) {
    console.log(url);
    const regex = new RegExp('^' + path); // '^' means start of the string
    console.log(regex);
    if (regex.test(url)) {
      return true;
    }
  }
  
  // If none of the allowed paths match, return false
  return false;
}

export default withAuth(
  function middleware(req) {
    if (!isAuthorizedRole(req.nextauth.token?.role, req.nextUrl.pathname)) {
      return NextResponse.redirect("http://localhost:3000/forbidden");
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
  matcher: ["/sa/:path*", "/providers/:path*"],
};
