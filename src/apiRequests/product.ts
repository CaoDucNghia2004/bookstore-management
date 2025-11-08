import http from "@/lib/http";
import { ProductsResponseType } from "@/schemaValidations/product.schema";

const productApiRequests = {
    getProducts: (query = "") =>
        http.get<ProductsResponseType>(`/api/product?${query}`, {
            baseUrl: "",
        }),
    sGetProducts: (query = "") =>
        http.get<ProductsResponseType>(`/api/v1/products?${query}`),
};

export default productApiRequests;
