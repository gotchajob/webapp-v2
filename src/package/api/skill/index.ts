import { apiServerFetch, errorSystem } from "../api-fetch";

export interface getSkillResponses {
    status: string,
    responseText: string,
    data: Skill[],
}

export interface Skill {
    categoryId: number,
    id: number,
    name: string
}

export async function GetSkill(): Promise<getSkillResponses> {
    try {
        const res = await apiServerFetch('/skill', "GET");
        return res;
    } catch (error: any) {
        return errorSystem("Lấy kỹ năng thất bại", []);
    }
}

