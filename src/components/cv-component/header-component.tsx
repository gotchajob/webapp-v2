import Box from '@mui/material/Box';
import { CVComponent, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';
import { useEffect, useState } from 'react';
import { CVTemplate } from 'components/cv-component/interface';

const cvTemplate = CVTemplate;

export const HeaderComponent = ({ component, columnIndex, componentIndex, onChangeComponent }
  : {
    component: CVComponent; columnIndex: number; componentIndex: number
    ; onChangeComponent: (newComponent: CVComponent, componentIndex: number, columnIndex: number) => void
  }) => {

  //State handleChangeComponentList
  const [changeDescription, setChangeDescription] = useState<any | null>();

  //State handleChangeHeader 
  const [changeHeader, setChangeHeader] = useState<any | null>();

  const [changeComponent, setChangeComponent] = useState(false);

  const handleChangeDescription = (newDescription: string) => {
    if (newDescription) {
      setChangeDescription(newDescription);
      setChangeComponent(true);
    }
  }

  const handleChangeHeader = (newHeader: string) => {
    if (newHeader) {
      setChangeHeader(newHeader);
      setChangeComponent(true);
    }
  }

  const handleChangeComponent = () => {
    if (!changeComponent) {
      onChangeComponent({ ...component, description: changeDescription, header: changeHeader }, componentIndex, columnIndex);
    }
    setChangeComponent(false);
  }

  useEffect(() => {
    setTimeout(() => {
      handleChangeComponent();  
    }, 5000);
  }, []);



  return (
    <Stack py={2} direction={'column'} spacing={1.5}>
      <EnchantInput
        initValue={component.header}
        onChange={handleChangeHeader}
      />
      <Divider />
      <Box mt={'0px !important'}>
        <EnchantInput
          initValue={component.description}
          onChange={handleChangeDescription}
        />
      </Box>
    </Stack>
  );
};


// useEffect(() => {
//   console.log("component :", component);
//   console.log("componentList index :", componentListIndex);
//   console.log("layout index :", layoutIndex)
// }, [component]);