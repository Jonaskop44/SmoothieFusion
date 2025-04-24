import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as cookie from "cookie";
import ApiClient from "./api";

const apiClient = new ApiClient();

export default async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.accessToken;
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const protectedPaths = ["/profil"];

  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath))) {
    if (!token || !(await isTokenValid(token))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

async function isTokenValid(token: string) {
  const response = await apiClient.auth.helper.verifyToken(token);
  return response.status === true;
}

export const config = {
  matcher: ["/profil", "/"],
};
