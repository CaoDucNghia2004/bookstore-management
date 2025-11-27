import { z } from "zod";

// Schema cho sản phẩm trong danh mục
export const ProductInTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    author: z.string(),
    price: z.number(),
    thumbnail: z.string().nullable().optional(),
});

// Schema cho danh mục sản phẩm (product-types)
export const ProductTypeSchema = z.object({
    id: z.number(),
    name: z.string(),
    products: z.array(ProductInTypeSchema),
});

// Schema cho response từ API /api/v1/product-types
export const ProductTypeResponseSchema = z.object({
    status: z.number(),
    message: z.string(),
    data: z.array(ProductTypeSchema),
    error: z.string().nullable().optional(),
});

export type ProductInType = z.infer<typeof ProductInTypeSchema>;
export type ProductTypeType = z.infer<typeof ProductTypeSchema>;
export type ProductTypeResponse = z.infer<typeof ProductTypeResponseSchema>;

