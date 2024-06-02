import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { CVTemplate } from 'components/cv-component/interface';
import { useEffect, useMemo, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Chip from 'ui-component/extended/Chip';
import { CVUploadImage } from './avatar';
import { InformationComponent } from './information-component';
import { HeaderComponent } from './header-component';

const numberColumnOptions = [1, 2, 3, 4, 5];

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

export const CreateCV = ({ data }: { data: CVTemplate }) => {

  const [template, setTemplate] = useState(data);

  const [numberColumn, setNumberColumn] = useState(1);


  const handleSelectNumberColumn = (value: number) => {
    setNumberColumn(value);
  };

  return (
    <Grid container padding={3}>
      <Grid item xs={8}>
        <Grid container component={Paper} maxWidth={900} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
          {template.layout
            .map((e) => {
              return (
                <Grid key={e.id} xs={e.size} minHeight={100} bgcolor={e.color} borderRadius={'inherit'} p={2}>
                  {e.componentList.map((e, index) => {
                    if (e.dataType === 'image') {
                      return <CVUploadImage key={index} avatar={e.description} />;
                    }
                    if (e.dataType === 'information') {
                      return <InformationComponent key={index} component={e} information={template.personal} />;
                    }
                    if (e.dataType === 'text') {
                      return <HeaderComponent key={index} component={e} />;
                    }
                  })}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid item xs={4}>
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
      </Grid>
    </Grid>
  );
};
