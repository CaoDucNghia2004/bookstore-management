import { create } from "zustand";

// Lưu thông tin sản phẩm được recommend từ AI
// Để biết khi nào cần gọi feedback API

type PositionType = "home" | "search" | "cart";

interface RecommendedProduct {
    productId: number;
    position: PositionType;
}

interface AIRecommendState {
    // Map: productId -> position
    recommendedProducts: Map<number, PositionType>;

    // Thêm sản phẩm vào danh sách recommend
    addRecommendedProducts: (productIds: number[], position: PositionType) => void;

    // Kiểm tra sản phẩm có được recommend không
    isRecommended: (productId: number) => boolean;

    // Lấy position của sản phẩm (nếu được recommend)
    getProductPosition: (productId: number) => PositionType | null;

    // Xóa tất cả
    clearRecommendedProducts: () => void;
}

export const useAIRecommendStore = create<AIRecommendState>((set, get) => ({
    recommendedProducts: new Map(),

    addRecommendedProducts: (productIds: number[], position: PositionType) => {
        set((state) => {
            const newMap = new Map(state.recommendedProducts);
            productIds.forEach((id) => {
                newMap.set(id, position);
            });
            return { recommendedProducts: newMap };
        });
    },

    isRecommended: (productId: number) => {
        return get().recommendedProducts.has(productId);
    },

    getProductPosition: (productId: number) => {
        return get().recommendedProducts.get(productId) || null;
    },

    clearRecommendedProducts: () => {
        set({ recommendedProducts: new Map() });
    },
}));

// Helper function để dùng ngoài React component
export const getAIRecommendStore = () => useAIRecommendStore.getState();

