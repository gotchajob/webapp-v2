import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface BuyServiceRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchBuyService = async (accessToken: string): Promise<BuyServiceRes> => {
    try {
        const res = await apiServerFetch('/customer/buy-service', 'PATCH', undefined, accessToken);
        return res;
    } catch (error) {
        return errorSystem('Thất bại', '');
    }
};
