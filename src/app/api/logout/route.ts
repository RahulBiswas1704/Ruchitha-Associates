import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Delete the admin session cookie
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  
  // Redirect back to home page
  return NextResponse.redirect(new URL("/", request.url));
}
