import Box from '@mui/material/Box';
import { CVComponent, Column, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';
import { useEffect, useState } from 'react';
import { CVTemplate } from 'components/cv-component/interface';

const cvTemplate = CVTemplate;

export const HeaderComponent = ({ component, columnIndex, componentIndex, onChangeLayout }
  : {
    component: CVComponent; columnIndex: number; componentIndex: number
    ; onChangeLayout: (CVLayout: Column[]) => void
  }) => {

  const [CVEditLayout, setCVEditLayout] = useState<any | null>();

  const handleChangeDescription = (newDescription: string) => {
    if (newDescription) {
      let newCV = { ...cvTemplate };
      newCV.layout[columnIndex].componentList[componentIndex].description = newDescription;
      setCVEditLayout(newCV.layout);
      handleChangeLayout();
    }
  }

  const handleChangeHeader = (newHeader: string) => {
    if (newHeader) {
      let newCV = { ...cvTemplate };
      newCV.layout[columnIndex].componentList[componentIndex].header = newHeader;
      setCVEditLayout(newCV.layout);
      handleChangeLayout();
    }
  }

  const handleChangeLayout = () => {
    if (onChangeLayout) {
      onChangeLayout(CVEditLayout);
    }
  }

  return (
    <Stack py={2} direction={'column'}>
      <EnchantInput
        initValue={component.header}
        onBlur={handleChangeHeader}
      />
      <Divider />
      <Box mt={'0px !important'}>
        <EnchantInput
          initValue={component.description}
          onBlur={handleChangeDescription}
        />
      </Box>
    </Stack>
  );
};


