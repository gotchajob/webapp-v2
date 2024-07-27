import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface CheckBuyServiceRes {
    status: string;
    responseText: string;
    data: string;
}

export const GetCheckBuyService = async (accessToken: string): Promise<CheckBuyServiceRes> => {
    try {
        const res = await apiServerFetch('/customer/check-buy-service', 'GET', undefined, accessToken);
        return res;
    } catch (error) {
        return errorSystem('Thất bại', '');
    }
};
