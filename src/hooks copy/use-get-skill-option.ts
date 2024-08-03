import { GetSkillOption, GetSkillOptionRequest, SkillOption } from 'package/api/skill-option';
import { useEffect, useState } from 'react';

export const useGetSkillOptions = (params: GetSkillOptionRequest) => {
  const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);

  const getClientSkillOptions = async () => {
    const data = await GetSkillOption(params);
    setSkillOptions(data.data);
  };

  useEffect(() => {
    getClientSkillOptions();
  }, [params.categoryId]);

  return {
    skillOptions
  };
};
