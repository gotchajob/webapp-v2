import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetCurrentBalanceResponse {
    status: string;
    responseText: string;
    data: CurrentBalance;
}

export interface CurrentBalance {
    balance: number;
}

export const GetCurrentBalance = async (accessToken: string): Promise<GetCurrentBalanceResponse> => {
    try {
        const res = await apiServerFetch(`/account/current/balance`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};