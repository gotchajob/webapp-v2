import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertMatchingRequest {
  by: number;
  skillOptionId: number[];
  nation: string[];
  minYearExperience: number;
}
export interface ExpertMatchingResponse {
  status: string;
  responseText: string;
  data: ExpertMatching[];
}

export interface ExpertMatchingNation {
  id: number;
  nation: string;
}

export interface ExpertMatchingSkill {
  id: number;
  skillOptionId: number;
  skillOptionName: string;
  defaultPoint: number;
  certificate: string;
}

export interface ExpertMatching {
  expertId: number;
  userId: number;
  fullName: string;
  avatar: string;
  email: string;
  yearExperience: number;
  nationSupport: ExpertMatchingNation[];
  point: number;
  bio: string;
  skills: ExpertMatchingSkill[];
}

export const GetExpertMatching = async (params: ExpertMatchingRequest): Promise<ExpertMatchingResponse> => {
  try {
    const url = new URLSearchParams();
    url.append('by', params.by + '');
    url.append('minYearExperience', params.minYearExperience + '');
    params.nation.forEach((value) => {
      url.append('nation', value);
    });
    params.skillOptionId.forEach((value) => {
      url.append('skillOptionId', value + '');
    });
    const res = await apiServerFetch(`/expert/match-v2?${url.toString()}`, 'GET', undefined);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Đăng nhập thất bại', { token: '' });
  }
};
