import productApiRequests from "@/apiRequests/product";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useProducts = (query = "") => {
    return useQuery({
        queryKey: ["products", query],
        queryFn: () => productApiRequests.getProducts(query),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60,
    });
};
