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
import { formatDate } from 'package/util';
import { CustomerToken } from 'hooks/use-login';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const yearOption = [
  { id: 1, name: 'Trên 1 năm' },
  { id: 3, name: 'Trên 3 năm' },
  { id: 5, name: 'Trên 5 năm' }
];

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  const { customerToken } = CustomerToken();

  const [categoryId, setCategoryId] = useState(0);

  const [minYearExperience, setMinYearExperience] = useState(1);

  const [skillOptionIdList, setSkillOptionIdList] = useState<number[]>([]);

  const [expertMatchingList, setExpertMatchingList] = useState<ExpertMatching[]>([]);

  const [nation, setNation] = useState<string[]>([]);

  const { countries } = useGetCountry();

  const { categories } = useGetCategories({});

  const { skill } = useGetSkill();

  const { skillOptions } = useGetSkillOptions({ categoryId });

  const [checkedState, setCheckedState] = useState({
    country: false,
    skills: false,
    experience: false
  });
  const handleCheckboxChange = (event: { target: { name: string; checked: boolean } }) => {
    const { name, checked } = event.target;
    setCheckedState({
      country: false,
      skills: false,
      experience: false,
      [name]: checked
    });
  };

  const getCheckedStateIndex = () => {
    if (checkedState.country) {
      return 1;
    }
    if (checkedState.skills) {
      return 2;
    }
    if (checkedState.experience) {
      return 3;
    }
    return 0;
  };
  const getClientExpertMatching = async () => {
    try {
      setIsLoading(true);
      const data = await GetExpertMatching({ by: getCheckedStateIndex(), minYearExperience, nation, skillOptionId: skillOptionIdList });
      if (data.status === 'error') {
        throw new Error('');
      }
      setExpertMatchingList(data.data);
      saveLastFilter(data.data);
    } catch (error: any) {
    } finally {
      setIsLoading(false);
    }
  };

  const saveLastFilter = (expertMatching: ExpertMatching[]) => {
    if (localStorage) {
      const saveData = {
        nation,
        categoryId,
        minYearExperience,
        skillOptionIdList,
        checkedState,
        expertMatchingList: expertMatching,
        lastCustomer: customerToken
      };
      localStorage.setItem('lastFilter', JSON.stringify(saveData));
    }
  };

  useEffect(() => {
    if (localStorage) {
      const stringData = localStorage.getItem('lastFilter');
      if (stringData) {
        const saveData = JSON.parse(stringData);
        if (saveData.lastCustomer === customerToken) {
          setNation(saveData.nation);
          setCategoryId(saveData.categoryId);
          setMinYearExperience(saveData.minYearExperience);
          setSkillOptionIdList(saveData.skillOptionIdList);
          setCheckedState(saveData.checkedState);
          setExpertMatchingList(saveData.expertMatchingList);
        }
      }
    }
  }, []);

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
          height: '500px',
          backgroundImage: 'url(https://s30876.pcdn.co/wp-content/uploads/Enhance-your-CV-1170x630.jpg.optimal.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'start',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{
            backgroundColor: '#AAD4EB',
            opacity: 0.8,
            maxWidth: '40%',
            padding: '40px',
            borderTopRightRadius: '35px',
            borderBottomRightRadius: '35px',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#333',
              fontWeight: 700,
              marginBottom: '16px',
              fontSize: '60px',
            }}
          >
            Khám phá chuyên gia hàng đầu
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{
              color: '#555',
              marginBottom: '24px',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            Kết nối với những chuyên gia có tầm cỡ, người sẽ đưa sự nghiệp của bạn lên tầm cao mới. Đừng bỏ lỡ cơ hội vàng để mở rộng mạng lưới chuyên môn và học hỏi từ những người dẫn đầu trong ngành.
          </Typography>
        </Grid>
      </Box>

      {/* <Container sx={{ my: 2 }}>
        <SubCard title="Hướng dẫn sử dụng">
          <Typography variant="body1" color="textSecondary">
            Sử dụng các trường tìm kiếm bên dưới để tìm kiếm các chuyên gia phù hợp theo quốc gia, kỹ năng, và số năm kinh nghiệm. Hệ thống sẽ tìm kiếm và hiển thị các chuyên gia có thông tin phù hợp với các tiêu chí bạn nhập vào để phỏng vấn và đánh giá CV.
          </Typography>
        </SubCard>
      </Container> */}

      {/* Filter section */}
      <Container>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={6}>
            <SubCard title="Quốc gia của chuyên gia">
              <Typography variant="body1" color="textSecondary" sx={{ py: 1 }}>
                Chọn quốc gia của chuyên gia phù hợp với bạn
              </Typography>
              <Autocomplete
                multiple
                options={countries}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                defaultValue={nation}
                onChange={(e, v) => {
                  setNation(v);
                }}
              />
            </SubCard>
          </Grid>
          <Grid item xs={6}>
            <SubCard title="Năm kinh nghiệm của chuyên gia">
              <Typography variant="body1" color="textSecondary" sx={{ py: 1 }}>
                Chọn năm kinh nghiệm của chuyên gia
              </Typography>
              <Autocomplete
                options={yearOption}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                defaultValue={yearOption.find((value) => value.id === minYearExperience)}
                onChange={(e, v) => {
                  setMinYearExperience(v?.id || 0);
                }}
              />
            </SubCard>
          </Grid>
          <Grid item xs={12}>
            <SubCard title="Ngành nghề của chuyên gia">
              <Typography variant="body1" color="textSecondary" sx={{ py: 1 }}>
                Chọn ngành nghề của chuyên gia
              </Typography>
              <Autocomplete
                options={categories}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                renderInput={(params) => <TextField {...params} />}
                defaultValue={categories.find((value) => value.id === categoryId)}
                onChange={(e, v) => {
                  handleChangeCategory(v);
                }}
              />
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  '& .MuiTreeItem-root': {
                    margin: '4px 0'
                  },
                  mt: 2
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
            </SubCard>
          </Grid>

          {/* <Grid item xs={12}>
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
          </Grid> */}
          <Grid item xs={12}>
            <SubCard title="Tùy chọn ưu tiên phù hợp">
              <Typography variant="body1" color="textSecondary" sx={{ py: 1 }}>
                Chúng tôi sẽ tìm kiếm chuyên gia dựa trên ưu tiên của bạn dưới đây
              </Typography>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" name="country" checked={checkedState.country} onChange={handleCheckboxChange} />}
                    label="Quốc gia"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox color="primary" name="skills" checked={checkedState.skills} onChange={handleCheckboxChange} />}
                    label="Kỹ năng"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox color="primary" name="experience" checked={checkedState.experience} onChange={handleCheckboxChange} />
                    }
                    label="Năm kinh nghiệm"
                  />
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
        {expertMatchingList.map((expert, index) => (
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
