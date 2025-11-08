import { NextResponse } from "next/server";
import authApiRequest from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    try {
        const body = (await request.json()) as LoginBodyType;
        const { status, payload, headers } = await authApiRequest.sLogin(body);

        const accessToken = payload?.data?.access_token;
        const decodeAccessToken = jwt.decode(accessToken) as { exp: number };

        const setCookieHeader = headers.get("set-cookie");
        console.log("Set-Cookie Header from BE:", setCookieHeader);

        const response = NextResponse.json(payload, { status });

        // Forward cookie refresh token từ BE -> Browser
        if (setCookieHeader) {
            response.headers.set("set-cookie", setCookieHeader);
        }
        cookieStore.set("access_token", accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            expires: decodeAccessToken.exp * 1000,
        });

        return response;
    } catch (error) {
        console.error("Login route error:", error);
        if (error instanceof HttpError) {
            return NextResponse.json(error.payload, { status: error.status });
        }
        return NextResponse.json(
            { message: "Đăng nhập thất bại. Vui lòng thử lại." },
            { status: 500 }
        );
    }
}
