import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

const BACKEND_URL = "https://primebackend.onrender.com/api/auth/login";


// const BACKEND_URL = "http://localhost:3000/api/auth/login";


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const backendRes = await axios.post(BACKEND_URL, body, {
      withCredentials: true,
    });

    const response = NextResponse.json(backendRes.data, {
      status: backendRes.status,
    });

    // ✅ Handle set-cookie properly if it's an array
    const setCookieHeader = backendRes.headers["set-cookie"];
    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        for (const cookie of setCookieHeader) {
          response.headers.append("set-cookie", cookie);
        }
      } else {
        response.headers.set("set-cookie", setCookieHeader);
      }
    }

    return response;
  } catch (err: any) {
    console.error("Login proxy error:", err.response?.data || err.message);
    return NextResponse.json(
      { message: err?.response?.data?.message || "Login failed" },
      { status: err?.response?.status || 500 }
    );
  }
}
