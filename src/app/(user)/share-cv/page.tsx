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
import { useState } from 'react';
import { useGetCountry } from 'hooks/use-address';
import { useGetCategories } from 'hooks/use-get-category';
import ExpertDetailCard from './_component/expert-detail-card';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import { ExpertMatching, GetExpertMatching } from 'package/api/expert/match';
import { useGetSkillOptions } from 'hooks/use-get-skill-option';
import { LoadingButton } from '@mui/lab';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const yearOption = [
  { id: 1, name: 'Trên 1 năm' },
  { id: 3, name: 'Trên 3 năm' },
  { id: 5, name: 'Trên 5 năm' }
];

export default function Page() {
  const [categoryId, setCategoryId] = useState(0);
  const [minYearExperience, setMinYearExperience] = useState(0);
  const [nation, setNation] = useState<string[]>([]);
  const [skillOptionIdList, setSkillOptionIdList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { countries } = useGetCountry();
  const { categories } = useGetCategories({});
  const { skillOptions } = useGetSkillOptions({ categoryId });

  const [expertMatchingList, setExpertMatchingList] = useState<ExpertMatching[]>([]);
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

      {/* Filter section 2 */}
      <Container maxWidth="md">
        <Grid container spacing={3} justifyContent={'center'} mt={5}>
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
          <Grid item xs={6}>
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
          <Grid item xs={4}>
            <Autocomplete
              options={categories}
              getOptionLabel={(option) => option.name}
              filterSelectedOptions
              renderInput={(params) => <TextField {...params} label="Ngành nghề" />}
              defaultValue={categories[0]}
              onChange={(e, v) => {
                setCategoryId(v?.id || 0);
              }}
            />
          </Grid>
          <Grid item xs={8}>
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
          </Grid>
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
