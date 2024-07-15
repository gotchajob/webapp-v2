'use client';

import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
import SubCard from 'ui-component/cards/SubCard';
import { Checkbox, FormControlLabel } from '@mui/material';
import { Category } from 'package/api/category';
import { handleClientScriptLoad } from 'next/script';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const yearOption = [
  { id: 1, name: 'Trên 1 năm' },
  { id: 3, name: 'Trên 3 năm' },
  { id: 5, name: 'Trên 5 năm' }
];

export default function Page() {

  const [isLoading, setIsLoading] = useState(false);

  const [categoryId, setCategoryId] = useState(0);

  const [minYearExperience, setMinYearExperience] = useState(0);

  const [skillOptionIdList, setSkillOptionIdList] = useState<number[]>([]);

  const [expertMatchingList, setExpertMatchingList] = useState<ExpertMatching[]>([]);

  const [nation, setNation] = useState<string[]>([]);

  const { countries } = useGetCountry();

  const { categories } = useGetCategories({});

  const { skill } = useGetSkill();

  const { skillOptions } = useGetSkillOptions({ categoryId });

  const getClientExpertMatching = async () => {
    try {
      setIsLoading(true);
      const data = await GetExpertMatching({ categoryId, minYearExperience, nation, skillOptionId: skillOptionIdList });
      if (data.status === 'error') {
        throw new Error('');
      }
      setExpertMatchingList(data.data);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };
  const filterSkillByCategory = (skills: Skill[], categoryId: number) => {
    return skills.filter((value) => value.categoryId === categoryId);
  };

  const filterSkillOptionBySkill = (skillOptions: SkillOption[], skillId: number) => {
    return skillOptions.filter((value) => value.skillId === skillId);
  };

  const handleChangeCategory = (category: Category | null) => {
    if (category) {
      setCategoryId(category.id);
    }
  };

  const handleUpdateSkillOptionIdList = (skillOptionId: number) => {
    let newSkillOptionId = skillOptionIdList;
    if (newSkillOptionId.includes(skillOptionId)) {
      newSkillOptionId = newSkillOptionId.filter((value) => value !== skillOptionId);
    } else {
      newSkillOptionId = [...newSkillOptionId, skillOptionId];
    }
    setSkillOptionIdList(newSkillOptionId);
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
                handleChangeCategory(v);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TreeView
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                '& .MuiTreeItem-root': {
                  margin: '4px 0'
                }
              }}
            >
              {filterSkillByCategory(skill, categoryId).map((skillItem, index) => (
                <TreeItem key={index} nodeId={skillItem.name} label={skillItem.name}>
                  <Grid container spacing={1} sx={{ my: 1 }}>
                    {filterSkillOptionBySkill(skillOptions, skillItem.id).map((option) => {
                      const isSelected = skillOptionIdList.includes(option.id);
                      return (
                        <Grid item key={option.id} xs={2}>
                          <Button
                            sx={{ minWidth: 120 }}
                            variant={isSelected ? 'contained' : 'outlined'}
                            onClick={() => {
                              handleUpdateSkillOptionIdList(option.id);
                            }}
                          >
                            {option.name}
                          </Button>
                        </Grid>
                      );
                    })}
                  </Grid>
                </TreeItem>
              ))}
            </TreeView>
          </Grid>
          <Grid item xs={12}>
            <SubCard title="Tùy chọn ưu tiên phù hợp">
              <Grid container spacing={2}>
                <Grid item>
                  <FormControlLabel control={<Checkbox color="primary" />} label="Quốc gia" />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Checkbox color="primary" />} label="Kỹ năng" />
                </Grid>
                <Grid item>
                  <FormControlLabel control={<Checkbox color="primary" />} label="Năm kinh nghiệm" />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          <Grid item xs={12} justifyContent={'center'} display={'flex'}>
            <LoadingButton loading={isLoading} variant="contained" onClick={getClientExpertMatching}>
              Áp dụng
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>

      {/* Expert List */}
      <Grid container spacing={3} minHeight={300} mt={15} px={30}>
        {expertMatchingList?.map((expert, index) => (
          <Grid key={index} item xs={3}>
            <ExpertDetailCard expert={expert} />
          </Grid>
        ))}
        <Grid container item justifyContent="center" alignItems="center" py={4}>
          <Box>
            <Pagination count={10} color="primary" size="large" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
