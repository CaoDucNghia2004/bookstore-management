import http from "@/lib/http";
import {
    Top5ProductsSoldResponseType,
    AIRecommendRequestType,
    AIRecommendResponseType,
    AIFeedbackRequestType,
    AIFeedbackResponseType,
} from "@/schemaValidations/dashboard.schema";

const dashboardApiRequests = {
    // Client-side: gọi qua Next.js route handler
    getTop5ProductsSold: () =>
        http.get<Top5ProductsSoldResponseType>(
            "/api/dashboard/get-top5-products-sold",
            { baseUrl: "" }
        ),

    // Server-side: gọi trực tiếp backend
    sGetTop5ProductsSold: () =>
        http.get<Top5ProductsSoldResponseType>(
            "/api/v1/dashboard/get-top5-products-sold"
        ),

    // AI Recommendation - Client-side
    getAIRecommendation: (body: AIRecommendRequestType) =>
        http.post<AIRecommendResponseType>("/api/ai/recommend", body, {
            baseUrl: "",
        }),

    // AI Recommendation - Server-side
    sGetAIRecommendation: (body: AIRecommendRequestType) =>
        http.post<AIRecommendResponseType>("/api/v1/AI/recommend", body),

    // AI Feedback - Client-side
    sendAIFeedback: (body: AIFeedbackRequestType) =>
        http.post<AIFeedbackResponseType>("/api/ai/feedback", body, {
            baseUrl: "",
        }),

    // AI Feedback - Server-side
    sSendAIFeedback: (body: AIFeedbackRequestType) =>
        http.post<AIFeedbackResponseType>("/api/v1/AI/feedback", body),
};

export default dashboardApiRequests;

