import http from "@/lib/http";
import { CartResponseType } from "@/schemaValidations/cart.schema";

export const cartApiRequests = {
    addToCart: (body: { email: string; productId: number; quantity: number }) =>
        http.post<CartResponseType>("/api/cart/add", body, {
            baseUrl: "",
        }),

    sAddToCart: (body: {
        email: string;
        productId: number;
        quantity: number;
    }) => http.post<CartResponseType>("/api/v1/cart/add", body),
};
