import http from "@/lib/http";
import { ProductTypeResponse } from "@/schemaValidations/productType.schema";

const productTypeApiRequests = {
    // Client-side: gọi qua Next.js route handler
    getProductTypes: () =>
        http.get<ProductTypeResponse>("/api/product-types", {
            baseUrl: "",
        }),

    // Server-side: gọi trực tiếp backend
    sGetProductTypes: () =>
        http.get<ProductTypeResponse>("/api/v1/product-types"),
};

export default productTypeApiRequests;

