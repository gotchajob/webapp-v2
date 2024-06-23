'use client';

import { CreateCV } from 'components/cv-component/cv';
import { CVTemplate, CVTemplateData, Column, PersonalComponent } from 'components/cv-component/interface';
import { useEffect, useRef, useState } from 'react';
import data from 'views/widget/data';
import CreateCVHeader from './_component/CreateCVHeader';
import TabsTable from './_component/TabsTable';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MainCard from 'ui-component/cards/MainCard';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Page() {
  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>(CVTemplateData);

  const onChangeCV = (cv: CVTemplate) => {
    setHistoryTemplate([...historyTemplate, currentTemplate]);
    setCurrentTemplate(cv);
  };

  const CVRef = useRef(null);

  const handlePrint = async () => {
    if (CVRef.current) {
      const canvas = await html2canvas(CVRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cv.pdf');
    }
  };

  const handleReview = useReactToPrint({
    content: () => CVRef.current,
    documentTitle: 'CV'
  });

  useEffect(() => {
    console.log(currentTemplate);
  }, [currentTemplate]);

  return (
    <MainCard boxShadow hover sx={{ m: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CreateCVHeader cv={currentTemplate} onChangeCV={onChangeCV} printOnClick={handlePrint} review={handleReview} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <CreateCV onChangeCV={onChangeCV} cv={currentTemplate} cvRef={CVRef} />
        </Grid>
        <Grid item xs={4}>
          <TabsTable cv={currentTemplate} onChangeCV={onChangeCV} />
        </Grid>
      </Grid>
    </MainCard>
  );
}
