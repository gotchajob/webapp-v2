'use client';

import { CreateCV } from 'components/cv-component/cv';
import { CVTemplate, CVTemplateData, Column, PersonalComponent } from 'components/cv-component/interface';
import { useEffect, useRef, useState } from 'react';
import data from 'views/widget/data';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MainCard from 'ui-component/cards/MainCard';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toPng } from 'html-to-image';
import { HeaderComponent } from 'components/cv-component/header-component';
import TabsTable from './_component/edit-tab';
import ManageCVHeader from './_component/header';
import { UseGetCVTemplateById } from 'hooks/use-get-cv-template';
import { enqueueSnackbar } from 'notistack';
import { useGetSearchParams } from 'hooks/use-get-params';
import { CustomerToken } from 'hooks/use-login';
import { UpdateCV } from 'package/api/cv/id';
import { useGetCVById } from 'hooks/use-get-cv-by-id';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';
import { useRefresh } from 'hooks/use-refresh';

export default function Page({ params }: { params: { id: string } }) {
  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>();

  const onChangeCV = (cv: CVTemplate) => {
    // setHistoryTemplate([...historyTemplate, currentTemplate]);
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
      pdf.save('cv.pdf');
    }
  };

  const handleReview = useReactToPrint({
    content: () => CVRef.current,
    documentTitle: 'CV'
  });

  const { customerToken } = CustomerToken();

  const { refresh, refreshTime } = useRefresh();
  const { cv } = useGetCVById(+params.id, customerToken, refreshTime);

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

  const handleSaveToDatabase = async () => {
    try {
      const imageUrl = await handleGetImage();
      console.log(imageUrl);
      if (currentTemplate && cv) {
        const data = await UpdateCV(
          {
            id: cv.id,
            cv: JSON.stringify(currentTemplate),
            name: currentTemplate.name,
            image: imageUrl
          },
          customerToken
        );
        if (data.status === 'error') {
          throw new Error('Lỗi không thể lưu cv');
        }
      } else {
        throw new Error('Lỗi không tìm thấy cv');
      }
      showSnackbarDialog('lưu cv thành công', 'success');
    } catch (error) {
      showSnackbarDialog('lưu cv thất bại', 'error');
    } finally {
      refresh();
    }
  };

  const handleGetImage = async () => {
    if (CVRef.current === null) {
      return;
    }

    try {
      const dataUrl = await toPng(CVRef.current);
      const blob = await (await fetch(dataUrl)).blob();
      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'my3ib4l5'); // Thay bằng upload preset của bạn
      const response = await fetch('https://api.cloudinary.com/v1_1/dfwqbf3xr/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error('Không thể lưu ảnh cv');
    }
  };

  useEffect(() => {
    if (cv) {
      try {
        setCurrentTemplate(JSON.parse(cv.cv));
      } catch (error) {
        setCurrentTemplate(CVTemplateData);
      }
    }
  }, [cv]);

  return (
    <Grid container spacing={3}>
      {currentTemplate && (
        <>
          {' '}
          <Grid item xs={12}>
            <ManageCVHeader
              cv={currentTemplate}
              onChangeCV={onChangeCV}
              download={handleDownload}
              review={handleReview}
              save={handleSaveToDatabase}
            />
          </Grid>
          <Grid item xs={8}>
            <CreateCV onChangeCV={onChangeCV} cv={currentTemplate} cvRef={CVRef} />
          </Grid>
          <Grid item xs={4}>
            <TabsTable cv={currentTemplate} onChangeCV={onChangeCV} />
          </Grid>
        </>
      )}
      <SnackbarDialog />
    </Grid>
  );
}
