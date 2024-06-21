'use client';

import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TreeItem, TreeView } from '@mui/x-tree-view';

// assets
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useGetExpertMatching } from 'hooks/use-get-expert-matching';
import { useEffect, useState } from 'react';
import { useGetCountry } from 'hooks/use-address';
import { useGetCategories } from 'hooks/use-get-category';
import ExpertDetailCard from './_component/expert-detail-card';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import { ExpertMatching, GetExpertMatching } from 'package/api/expert/match';
import { useGetSkillOptions } from 'hooks/use-get-skill-option';
import { LoadingButton } from '@mui/lab';
import { useGetSkill } from 'hooks/use-get-skill';
import { Skill } from 'package/api/skill';
import { SkillOption } from 'package/api/skill-option';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const yearOption = [
  { id: 1, name: 'Trên 1 năm' },
  { id: 3, name: 'Trên 3 năm' },
  { id: 5, name: 'Trên 5 năm' }
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const [categoryId, setCategoryId] = useState(0);

  const [skillId, setSkillId] = useState(0);

  const [optionById, setOptionById] = useState<SkillOption[] | null>([]);

  const [skillOptionIdList, setSkillOptionIdList] = useState<number[]>([]);

  const [minYearExperience, setMinYearExperience] = useState(0);

  const [expertMatchingList, setExpertMatchingList] = useState<ExpertMatching[]>([]);

  //skill selection state
  const [selectOptions, setSelectOptions] = useState<{ id: number, name: string }[]>([]);

  const { skill } = useGetSkill();

  const [skillByCategory, setSkillByCategory] = useState<Skill[] | null>(skill);

  const { categories } = useGetCategories({});

  const [nation, setNation] = useState<string[]>([]);

  const { countries } = useGetCountry();

  const { skillOptions } = useGetSkillOptions({ categoryId });

  //skill options selection handle
  const handleSkillOptionSelection = (skill: { id: number, name: string }) => {
    setSelectOptions(prevSkills => {
      const skillIndex = prevSkills.findIndex(s => s.id === skill.id);
      if (skillIndex !== -1) {
        const updatedSkills = [...prevSkills];
        updatedSkills.splice(skillIndex, 1);
        return updatedSkills;
      } else {
        return [...prevSkills, skill];
      }
    });
  };

  //Category selection handle
  const handleCategorySelection = (e: any, v: any) => {
    const selectedCategoryId = v?.id || 0;
    setCategoryId(selectedCategoryId);
    if (!skill) {
      return
    }
    let filteredSkill = [...skill];
    filteredSkill = skill.filter(item => item.categoryId === selectedCategoryId);
    handleSkillByCategory(filteredSkill);
  };

  //Category selection handle
  const handleSkillByCategory = (filteredSkill: Skill[]) => {
    setSkillByCategory(filteredSkill);
  };

  //Skill selection handle
  const handleSkillSelection = (e: any, v: any) => {
    const selectedSkillId = v?.id || 0;
    setSkillId(selectedSkillId);
    if (!skillOptions) {
      return
    }
    let filteredOption = [...skillOptions];
    filteredOption = skillOptions.filter(item => item.skillId === selectedSkillId);
    handleOptionBySkill(filteredOption);
  }

  //Skill selection handle
  const handleOptionBySkill = (filterdOption: SkillOption[]) => {
    setOptionById(filterdOption);
  }


  useEffect(() => {
    console.log("handleOptionBySkill :", optionById);
    console.log("skill Id :", skillId);
  }, [skillId, optionById]);

  useEffect(() => {
    console.log("Selected Options:", selectOptions);
  }, [selectOptions]);

  const getClientExpertMatching = async () => {
    try {
      setIsLoading(true);
      const data = await GetExpertMatching({ categoryId, minYearExperience, nation, skillOptionId: skillOptionIdList });
      if (data.status === 'error') {
        throw new Error('');
      }
      setExpertMatchingList(data.data);
      console.log(data);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '300px',
          backgroundImage: 'url(https://mentori.vn/upload/banners/kts1554959520.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(50%)'
        }}
      />

      {/* Filter section */}
      <Container maxWidth="md">
        <Grid container spacing={3} mt={3}>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              options={countries}
              getOptionLabel={(option) => option}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Quốc gia" />}
              defaultValue={nation}
              onChange={(e, v) => {
                setNation(v);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={yearOption}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Năm kinh nghiệm" />}
              defaultValue={yearOption[0]}
              onChange={(e, v) => {
                setMinYearExperience(v?.id || 0);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Ngành nghề" />}
              onChange={(e, v) => {
                handleCategorySelection(e, v);
              }}
            />
          </Grid>
          {/* <Grid item xs={8}>
            <Autocomplete
              multiple
              options={skillOptions}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Kĩ năng" />}
              defaultValue={[]}
              onChange={(e, v) => {
                const data: number[] = [];
                v.forEach((skillOption) => data.push(skillOption.id));
                setSkillOptionIdList(data);
              }}
            />
          </Grid> */}
          {categoryId !== 0 && (<Grid item xs={3}>
            <Autocomplete
              options={skillByCategory ? skillByCategory : []}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Lĩnh vực" />}
              onChange={(e, v) => {
                handleSkillSelection(e, v)
              }}
            />
          </Grid>)}
          {skillId !== 0 && (<Grid item xs={9}>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                '& .MuiTreeItem-root': {
                  margin: '4px 0',
                },
              }}
            >
              <TreeItem nodeId="skills" label="Kỹ năng">
                <Grid container spacing={1} sx={{ my: 1, mx: 2 }}>
                  {optionById && optionById.map((skill) => (
                    <Grid item key={skill.id}>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: selectOptions.some(s => s.id === skill.id) ? '#1976d2' : '#ffffff',
                          color: selectOptions.some(s => s.id === skill.id) ? '#ffffff' : '#000000',
                          '&:hover': {
                            backgroundColor: selectOptions.some(s => s.id === skill.id) ? '#1976d2' : '#e0e0e0',
                          },
                          width: '100%',
                          height: '100%'
                        }}
                        onClick={() => handleSkillOptionSelection(skill)}
                      >
                        {skill.name}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </TreeItem>
            </TreeView>
          </Grid>)}

          <Grid item xs={12} justifyContent={'center'} display={'flex'}>
            <LoadingButton loading={isLoading} variant="contained" onClick={getClientExpertMatching}>
              Áp dụng
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>

      {/* Expert List */}
      <Grid container spacing={3} minHeight={300} mt={15}>
        {expertMatchingList?.map((expert, index) => (
          <Grid key={index} item xs={3}>
            <ExpertDetailCard expert={expert} />
          </Grid>
        ))}
        <Grid container item justifyContent="center" alignItems="center" mt={4}>
          <Box>
            <Pagination count={10} color="primary" size="large" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
