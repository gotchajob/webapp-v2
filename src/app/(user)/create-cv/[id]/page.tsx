'use client';


import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import useSnackbarDialog from 'components/common/snackbar-dialog/snackbar-dialog';
import { CreateCV } from 'components/cv-component/cv';
import { CVTemplate, CVTemplateData } from 'components/cv-component/interface';
import { useGetCVById } from 'hooks/use-get-cv-by-id';
import { CustomerToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { UpdateCV } from 'package/api/cv/id';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import MainCard from 'ui-component/cards/MainCard';
import CreateCVHeader from './_component/CreateCVHeader';
import TabsTable from './_component/TabsTable';

export default function Page({ params }: { params: { id: string } }) {

  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();

  const { customerToken } = CustomerToken();

  const { refresh, refreshTime } = useRefresh();

  const { cv } = useGetCVById(+params.id, customerToken, refreshTime);

  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState<CVTemplate>();

  const onChangeCV = (cv: CVTemplate) => {
    if (currentTemplate) {
      setHistoryTemplate([...historyTemplate, currentTemplate]);
    }
    setCurrentTemplate(cv);
  };

  const CVRef = useRef(null);
  //Tải dưới dạng pdf
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
    await saveCV();
  };

  //Xuất ra dưới dạng ảnh
  const handleReview = useReactToPrint({
    content: () => CVRef.current,
    documentTitle: 'CV'
  });

  //Lưu vào database
  const saveCV = async () => {
    try {
      const imageUrl = await handleGetImage();
      console.log(imageUrl);
      if (currentTemplate) {
        const data = await UpdateCV(
          {
            id: cv?.id || 1,
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
      showSnackbarDialog('lưu cv thất bại', "error");
    } finally {
      refresh();
    }
  };

  useEffect(() => {
    if (cv) {
      setCurrentTemplate(JSON.parse(cv.cv));
    }
  }, [cv]);

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

  return (
    <MainCard boxShadow hover sx={{ m: 3 }}>
      {currentTemplate && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateCVHeader cv={currentTemplate} onChangeCV={onChangeCV} download={handleDownload} review={handleReview} saveCV={saveCV} />
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
      )}
      <SnackbarDialog />
    </MainCard>
  );
}
