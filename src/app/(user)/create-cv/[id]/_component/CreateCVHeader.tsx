'use client';

import ImageIcon from '@mui/icons-material/Image';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RedoIcon from '@mui/icons-material/Redo';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UndoIcon from '@mui/icons-material/Undo';
import { Autocomplete, Box, Divider, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { FlexBetween, FlexBox } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { CVTemplate } from 'components/cv-component/interface';

const fontOptions = [
  { label: 'Arial' },
  { label: 'Verdana' },
  { label: 'Times New Roman' },
  { label: 'Courier New' },
  { label: 'Roboto' },
  { label: 'Open Sans' },
  { label: 'Montserrat' }
];

const spacingData = [
  { spacing: 1.2 },
  { spacing: 1.3 },
  { spacing: 1.4 },
  { spacing: 1.5 },
  { spacing: 1.6 },
  { spacing: 1.7 },
  { spacing: 1.8 }
];

const CreateCVHeader = ({ cv, onChangeCV }: { cv: CVTemplate; onChangeCV: (cv: CVTemplate) => void }) => {
  return (
    <FlexBetween>
      <TextField placeholder="CV chưa đặt tên" />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          sx={{
            paddingX: '10px',
            backgroundColor: '#59ABD9',
            '&:hover': {
              backgroundColor: '#1976D2'
            },
            color: 'white'
          }}
        >
          <RemoveRedEyeIcon sx={{ fontSize: 35, pr: '5px' }} />
          Xem trước
        </Button>
        <Button
          variant="contained"
          sx={{
            paddingX: '10px',
            backgroundColor: '#59ABD9',
            '&:hover': {
              backgroundColor: '#1976D2'
            },
            color: 'white'
          }}
        >
          <SaveAltIcon sx={{ fontSize: 35, pr: '5px' }} />
          Lưu và tải xuống
        </Button>
        <Button
          variant="contained"
          sx={{
            paddingX: '10px',
            backgroundColor: '#1976D2',
            color: 'white'
          }}
        >
          <SaveIcon sx={{ fontSize: 35, pr: '5px' }} />
          Lưu lại
        </Button>
      </Stack>
    </FlexBetween>
  );
};

export default CreateCVHeader;
