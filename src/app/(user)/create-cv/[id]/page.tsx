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
import { UpdateCV } from 'package/api/cv/id';
import { useGetCVById } from 'hooks/use-get-cv-by-id';
import { CustomerToken } from 'hooks/use-login';
import { enqueueSnackbar } from 'notistack';
import { useRefresh } from 'hooks/use-refresh';

export default function Page({ params }: { params: { id: string } }) {
  const { customerToken } = CustomerToken();

  const { refresh, refreshTime } = useRefresh();

  const { cv } = useGetCVById(+params.id, customerToken, refreshTime);

  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>(CVTemplateData);

  const onChangeCV = (cv: CVTemplate) => {
    setHistoryTemplate([...historyTemplate, currentTemplate]);
    setCurrentTemplate(cv);
  };

  const CVRef = useRef(null);

  const handleDownload = async () => {
    if (CVRef.current) {
      const canvas = await html2canvas(CVRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      console.log("pdf:", pdf);
      pdf.save('cv.pdf');
    }
  };

  const handleReview = useReactToPrint({
    content: () => CVRef.current,
    documentTitle: 'CV'
  });

  const saveCV = async () => {
    try {
      const data = await UpdateCV(
        {
          id: cv?.id || 1,
          cv: JSON.stringify(currentTemplate),
          name: currentTemplate.name,
          image: ''
        },
        customerToken
      );
      if (data.status === 'error') {
        throw new Error('Lỗi không thể lưu cv');
      }
      enqueueSnackbar({ variant: 'success', message: 'lưu cv thành công' });
    } catch (error) {
    } finally {
      refresh();
    }
  };

  useEffect(() => {
    if (cv) {
      setCurrentTemplate(JSON.parse(cv.cv));
    }
  }, [cv]);
  return (
    <MainCard boxShadow hover sx={{ m: 3 }}>
      {cv ? (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateCVHeader
              cv={currentTemplate}
              onChangeCV={onChangeCV}
              printOnClick={handleDownload}
              review={handleReview}
              saveCV={saveCV}
            />
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
      ) : (
        <></>
      )}
    </MainCard>
  );
}
