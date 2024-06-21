import Box from '@mui/material/Box';
import { CVComponent, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Iconify from 'components/iconify/iconify';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { EnchantInput } from 'components/common/enchant-input';
import { useEffect, useState } from 'react';
import { CVTemplate } from 'components/cv-component/interface';
import { ContactlessOutlined } from '@mui/icons-material';

const cvTemplate = CVTemplate;

const FlexBox = styled(Box)({
  display: 'flex',
  alignItems: 'center'
});

export const InformationComponent = ({ columnIndex, componentIndex, component, information, onChangePersonal }: { columnIndex: number, componentIndex: number, component: CVComponent; information: PersonalComponent[]; onChangePersonal: (CVPersonal: PersonalComponent[]) => void }) => {

  const [CVEditPersonal, setCVEditPersonal] = useState<any | null>();

  const handleChangeHeader = (newHeader: string) => {
    if (newHeader) {
      let newCV = { ...cvTemplate };
      newCV.layout[columnIndex].componentList[componentIndex].header = newHeader;
      setCVEditPersonal(newCV.layout);
      handleChangeLayout();
    }
  }

  const handleChangePersonalComponent = (newPersonalComponent: string, index: number) => {
    if (newPersonalComponent) {
      let newCV = { ...cvTemplate };
      newCV.personal[index].title = newPersonalComponent;
      setCVEditPersonal(newCV.personal);
      handleChangeLayout();
    }
  }

  const handleChangeLayout = () => {
    if (onChangePersonal) {
      onChangePersonal(CVEditPersonal);
    }
  }

  return (
    <Stack py={2} direction={'column'}>
      <EnchantInput
        initValue={component.header}
        onBlur={handleChangeHeader}
      />
      <Divider />
      {information.map((e, index) => (
        <FlexBox key={index}>
          <Iconify icon={e.icon} width={20} color={component.color} />
          <Box pl={1}>
            <EnchantInput
              initValue={e.title}
              onBlur={(value) => handleChangePersonalComponent(value, index)}
            />
          </Box>
        </FlexBox>
      ))}
    </Stack>
  );
};
