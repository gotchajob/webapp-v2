import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CVComponent, CVTemplate, Column, PersonalComponent } from 'components/cv-component/interface';
import { Fragment, useEffect, useMemo, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import { CVUploadImage } from './avatar';
import { InformationComponent } from './information-component';
import { HeaderComponent } from './header-component';
import { StyledLink } from 'components/common/link/styled-link';
import { Autocomplete, Box, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ImageIcon from '@mui/icons-material/Image';
import TabsTable from 'app/(user)/create-cv/_component/TabsTable';
import InvertColorsIcon from '@mui/icons-material/InvertColors';

const numberColumnOptions = [1, 2, 3, 4, 5];

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const fontOptions = [
  { label: 'Arial' },
  { label: 'Verdana' },
  { label: 'Times New Roman' },
  { label: 'Courier New' },
  { label: 'Roboto' },
  { label: 'Open Sans' },
  { label: 'Montserrat' },
];

const spacingData = [
  { spacing: 1.2 },
  { spacing: 1.3 },
  { spacing: 1.4 },
  { spacing: 1.5 },
  { spacing: 1.6 },
  { spacing: 1.7 },
  { spacing: 1.8 },
];

export const CreateCV = ({ data }: { data: CVTemplate }) => {

  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState(data);

  const [numberColumn, setNumberColumn] = useState(1);

  const handleSelectNumberColumn = (value: number) => {
    setNumberColumn(value);
  };

  // const handelChangeComponent = (newCVComponent: CVComponent, componentIndex: number, columnIndex: number) => {
  //   console.log("handelChangeComponentList value:", newCVComponent);
  //   const newTemplate = { ...currentTemplate };
  //   setHistoryTemplate([...historyTemplate, currentTemplate]);
  //   newTemplate.layout[columnIndex].componentList[componentIndex] = newCVComponent;
  //   setCurrentTemplate(newTemplate);
  // }

  const handelChangeHeaderComponent = (newCVLayout: Column[]) => {
    if (newCVLayout) {
      const newTemplate = { ...currentTemplate, layout: [...newCVLayout] };
      setHistoryTemplate([...historyTemplate, currentTemplate]);
      setCurrentTemplate(newTemplate);
    }
  }

  const handleChangeInformationComponent = (newCVPersonal: PersonalComponent[]) => {
    console.log(" handleChangeInformationComponent:", newCVPersonal);
    if (newCVPersonal) {
      const newTemplate = { ...currentTemplate, }
    }
  }


  return (
    <>
      <Grid container item alignItems="center" sx={{ boxShadow: 3 }}>
        <Grid item xs={12} py={1} sx={{ borderBottom: '1px solid #E6E6E6', paddingBottom: "10px" }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingX: 5
            }}
          >
            <TextField placeholder="CV chưa đặt tên" />

            <Stack direction="row" spacing={2}>
              <Button
                variant='contained'
                sx={{
                  paddingX: "10px",
                  backgroundColor: '#59ABD9',
                  '&:hover': {
                    backgroundColor: '#1976D2',
                  },
                  color: 'white',
                }}
              >
                <RemoveRedEyeIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                Xem trước
              </Button>
              <Button
                variant='contained'
                sx={{
                  paddingX: "10px",
                  backgroundColor: '#59ABD9',
                  '&:hover': {
                    backgroundColor: '#1976D2',
                  },
                  color: 'white',
                }}
              >
                <SaveAltIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                Lưu và tải xuống
              </Button>
              <Button
                variant='contained'
                sx={{
                  paddingX: "10px",
                  backgroundColor: '#1976D2',
                  color: 'white',
                }}
              >
                <SaveIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                Lưu lại
              </Button>

            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} py={1} sx={{ paddingTop: "10px" }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-evenly",
            paddingX: 35,
          }}>
            <Stack direction={"row"} alignItems="center" spacing={1}>
              <Typography>Phông chữ</Typography>
              <Autocomplete
                disableClearable
                options={fontOptions}
                defaultValue={fontOptions[0]}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} label="" sx={{ width: 150 }} />}
              />
            </Stack>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack direction={"row"} alignItems="center" spacing={1}>
              <Typography>Khoảng cách dòng</Typography>
              <Autocomplete
                disableClearable
                options={spacingData}
                defaultValue={spacingData[0]}
                getOptionLabel={(option) => option.spacing.toString()}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </Stack>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack>
              <Button
                variant="text"
                sx={{
                  paddingX: "10px",
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                Màu chủ đề
                <InvertColorsIcon sx={{ fontSize: 35, paddingX: "5px" }} />
              </Button>
            </Stack >

            <Divider orientation="vertical" variant="middle" flexItem />

            <Stack>
              <Button
                variant="text"
                sx={{
                  paddingX: "10px",
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                }}
              >
                <ImageIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                Hình nền CV
              </Button>
            </Stack >

            <Divider orientation="vertical" variant="middle" flexItem />

            <Button variant="text"><UndoIcon sx={{ fontSize: 20 }} /></Button>

            <Button variant="text"><RedoIcon sx={{ fontSize: 20 }} /></Button>

            <StyledLink href="/share-cv">
              <Button variant="text">Tìm kiếm Expert</Button>
            </StyledLink>
          </Box>
        </Grid>
      </Grid >

      <Grid container padding={3}>
        <Grid item xs={4} spacing={3} >
          <TabsTable />
        </Grid>

        <Grid item xs={8}>
          <Grid container component={Paper} maxWidth={900} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
            {currentTemplate && currentTemplate.layout ? (
              currentTemplate.layout.map((column, columnIndex) => {
                return (
                  <Grid key={columnIndex} xs={column.size} minHeight={100} bgcolor={column.color} borderRadius={'inherit'} p={2}>
                    {column.componentList.map((row, rowIndex) => {
                      if (row.dataType === 'image') {
                        return <CVUploadImage key={rowIndex} avatar={row.description} />;
                      }
                      if (row.dataType === 'information') {
                        return <InformationComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} information={currentTemplate.personal} onChangePersonal={handleChangeInformationComponent} />;
                      }
                      if (row.dataType === 'text') {
                        return <HeaderComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} onChangeLayout={handelChangeHeaderComponent} />;
                      }
                    })}
                  </Grid>
                );
              })
            ) : (
              <>loading</>
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};