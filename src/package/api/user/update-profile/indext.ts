import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface PathcUserProfileRequest {
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    avatar: string
}

export interface PatchUserProfileResponse {
    status: string;
    responseText: string;
}

export async function PatchUserProfile(params: PathcUserProfileRequest, accessToken: string): Promise<PatchUserProfileResponse> {
    try {
        const res = await apiServerFetch(`/user/update-profile`, 'PATCH', params, accessToken);
        if (res.status === 'error') {
            throw new Error(res.responseText || 'Error fetching user data');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
}
