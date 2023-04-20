import { withAuth } from "next-auth/middleware"
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

function middleware(req) {
  if (!isAuthorizedRole(req.nextauth.token.user?.role, req.nextUrl.pathname)) {
      return NextResponse.redirect("http://localhost:3000/auth/login");
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

)

export const config = { matcher: [
  "/automotive_group/:path*",
  "/user/:path*",
]};