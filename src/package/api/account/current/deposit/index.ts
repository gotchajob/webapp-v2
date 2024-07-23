import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchDepositResponse {
    status: string;
    responseText: string;
}

export interface PatchDepositRequest {
    amount: number,
    description: string
}

export const PatchDeposit = async (params: PatchDepositRequest, accessToken: string): Promise<PatchDepositResponse> => {
    try {
        const res = await apiServerFetch(`/account/current/deposit`, 'PATCH', { amount: params.amount, description: params.description }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Nạp tiền thất bại', "");
    }
};