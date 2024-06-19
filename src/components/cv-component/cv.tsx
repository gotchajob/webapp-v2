import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CVComponent, CVTemplate } from 'components/cv-component/interface';
import { useEffect, useMemo, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import { CVUploadImage } from './avatar';
import { InformationComponent } from './information-component';
import { HeaderComponent } from './header-component';
import { StyledLink } from 'components/common/link/styled-link';

const numberColumnOptions = [1, 2, 3, 4, 5];

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

export const CreateCV = ({ data }: { data: CVTemplate }) => {

  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState(data);

  const [numberColumn, setNumberColumn] = useState(1);

  const handleSelectNumberColumn = (value: number) => {
    setNumberColumn(value);
  };

  const handelChangeComponent = (newCVComponent: CVComponent, componentIndex: number, columnIndex: number) => {
    console.log("handelChangeComponentList value:", newCVComponent);
    const newTemplate = { ...currentTemplate };
    setHistoryTemplate([...historyTemplate, currentTemplate]);
    newTemplate.layout[columnIndex].componentList[componentIndex] = newCVComponent;
    setCurrentTemplate(newTemplate);
  }

  // useEffect(() => {
  //   console.log("edited template:", template);
  // }, [template]);

  return (
    <Grid container padding={3}>
      <Grid item xs={8}>
        <Grid container component={Paper} maxWidth={900} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
          {currentTemplate.layout.map((column, columnIndex) => {
            return (
              <Grid key={columnIndex} xs={column.size} minHeight={100} bgcolor={column.color} borderRadius={'inherit'} p={2}>
                {column.componentList.map((row, rowIndex) => {
                  if (row.dataType === 'image') {
                    return <CVUploadImage key={rowIndex} avatar={row.description} />;
                  }
                  if (row.dataType === 'information') {
                    return <InformationComponent key={rowIndex} component={row} information={currentTemplate.personal} />;
                  }
                  if (row.dataType === 'text') {
                    return <HeaderComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} onChangeComponent={handelChangeComponent} />;
                  }
                })}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Stack spacing={3}>
          <MainCard title={'Column'} boxShadow hover>
            <Stack direction={'row'} spacing={2}>
              {numberColumnOptions.map((e) => (
                <Button
                  key={e}
                  onClick={() => {
                    handleSelectNumberColumn(e);
                  }}
                  variant={numberColumn === e ? 'contained' : 'outlined'}
                  sx={{
                    cursor: 'pointer'
                  }}
                  color="primary"
                >
                  {e}
                </Button>
              ))}
            </Stack>
          </MainCard>
          <StyledLink href="share-cv">
            <Button variant="outlined">Tìm kiếm Expert</Button>
          </StyledLink>
          <Stack direction={"row"} spacing={1}>

            <Button variant="outlined">Undo</Button>


            <Button variant="outlined">Redo</Button>

          </Stack>
        </Stack>

      </Grid>
    </Grid>
  );
};