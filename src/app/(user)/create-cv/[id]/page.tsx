'use client';

import { CreateCV } from 'components/cv-component/cv';
import { CVTemplate, CVTemplateData, Column, PersonalComponent } from 'components/cv-component/interface';
import { useEffect, useState } from 'react';
import data from 'views/widget/data';
import CreateCVHeader from './_component/CreateCVHeader';
import TabsTable from './_component/TabsTable';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MainCard from 'ui-component/cards/MainCard';

export default function Page() {
  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>(CVTemplateData);

  const onChangeCV = (cv: CVTemplate) => {
    setHistoryTemplate([...historyTemplate, currentTemplate]);
    setCurrentTemplate(cv);
  };
  useEffect(() => {
    console.log(currentTemplate);
  }, [currentTemplate]);
  return (
    <MainCard boxShadow hover sx={{m:3}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateCVHeader cv={currentTemplate} onChangeCV={onChangeCV} />
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        <Grid item xs={8}>
          <CreateCV onChangeCV={onChangeCV} cv={currentTemplate} />
        </Grid>
        <Grid item xs={4}>
          <TabsTable cv={currentTemplate} onChangeCV={onChangeCV} />
        </Grid>
      </Grid>
    </MainCard>
  );
}
