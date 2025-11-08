import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const accessToken = req.headers.get("authorization");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/v1/cart/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: accessToken || "",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        console.error("❌ [API /api/cart/add] error:", error);
        return NextResponse.json(
            { message: "Lỗi server khi thêm sản phẩm vào giỏ hàng" },
            { status: 500 }
        );
    }
}
