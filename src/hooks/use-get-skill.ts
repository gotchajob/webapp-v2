import { GetSkill, Skill } from "package/api/skill";
import { useEffect, useState } from "react";

export const useGetSkill = () => {
    const [skill, setSkill] = useState<Skill[]>([]);

    const getSkill = async () => {
        const data = await GetSkill();
        setSkill(data.data);
    }

    useEffect(() => {
        getSkill();
    }, [])

    return {
        skill
    }
}