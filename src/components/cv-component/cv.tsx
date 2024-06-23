import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CreateCVHeader from 'app/(user)/create-cv/[id]/_component/CreateCVHeader';
import TabsTable from 'app/(user)/create-cv/[id]/_component/TabsTable';
import { CVComponent, CVTemplate, Column, PersonalComponent } from 'components/cv-component/interface';
import { ReactNode, useState } from 'react';
import { CVUploadImage } from './avatar';
import { HeaderComponent } from './header-component';
import { InformationComponent } from './information-component';
import Box from '@mui/material/Box';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { PRIMARYCOLOR } from 'components/common/config';

const defaultShadow = '0 2px 14px 0 rgb(33 150 243 / 10%)';

export const CreateCV = ({ cv, onChangeCV }: { cv: CVTemplate; onChangeCV: (cv: CVTemplate) => void }) => {
  const handelChangeHeaderComponent = (newCVComponent: CVComponent, columnIndex: number, componentIndex: number) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList[componentIndex] = newCVComponent;
    onChangeCV(newCV);
  };

  const handleChangeInformationComponent = (
    newCVPersonalComponent: PersonalComponent[],
    newCVComponent: CVComponent,
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    newCV.personal = newCVPersonalComponent;
    newCV.layout[columnIndex].componentList[componentIndex] = newCVComponent;
    onChangeCV(newCV);
  };

  const handleChangeAvatar = (image: string, columnIndex: number, componentIndex: number) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList[componentIndex].description = image;
    onChangeCV(newCV);
  };

  const handleDeleteComponent = (columnIndex: number, componentIndex: number) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList.splice(componentIndex, componentIndex === 0 ? componentIndex + 1 : componentIndex);
    onChangeCV(newCV);
  };

  const [onClickComponent, setOnClickComponent] = useState('');

  const ComponentWarper = ({ children, index }: { children: ReactNode; index: string }) => {
    const isClicked = index == onClickComponent;
    const [componentIndex, columnIndex] = index.split('-');
    return (
      <Box
        p={2}
        boxShadow={isClicked ? defaultShadow : 'none'}
        position={'relative'}
        borderRadius={1}
        border={isClicked ? `1px solid ${PRIMARYCOLOR}` : 'none'}
        onClick={() => {
          setOnClickComponent(index);
        }}
      >
        {isClicked ? (
          <IconButton
            color="error"
            size="small"
            sx={{ position: 'absolute', top: -17, right: -16 }}
            onClick={() => {
              handleDeleteComponent(+columnIndex, +componentIndex);
            }}
          >
            <ClearIcon />
          </IconButton>
        ) : null}
        {children}
      </Box>
    );
  };
  return (
    <Grid container component={Paper} maxWidth={800} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
      {cv.layout.map((column, columnIndex) => {
        return (
          <Grid key={columnIndex} xs={column.size} minHeight={100} bgcolor={column.backgroudColor} borderRadius={'inherit'}>
            {column.componentList.map((component, componentIndex) => {
              if (component.dataType === 'image') {
                return (
                  <ComponentWarper key={componentIndex} index={componentIndex + '-' + columnIndex}>
                    <CVUploadImage
                      avatar={component.description}
                      handleChangeAvatar={(value) => {
                        handleChangeAvatar(value, columnIndex, componentIndex);
                      }}
                    />
                  </ComponentWarper>
                );
              }
              if (component.dataType === 'information') {
                return (
                  <ComponentWarper key={componentIndex} index={componentIndex + '-' + columnIndex}>
                    <InformationComponent
                      component={component}
                      primaryColor={cv.primaryColor}
                      information={cv.personal}
                      onChangeComponent={(newCVPersonalComponent, newCVComponent) => {
                        handleChangeInformationComponent(newCVPersonalComponent, newCVComponent, columnIndex, componentIndex);
                      }}
                    />
                  </ComponentWarper>
                );
              }
              if (component.dataType === 'text') {
                return (
                  <ComponentWarper key={componentIndex} index={componentIndex + '-' + columnIndex}>
                    <HeaderComponent
                      component={component}
                      onChangeComponent={(newCVComponent) => {
                        handelChangeHeaderComponent(newCVComponent, columnIndex, componentIndex);
                      }}
                    />
                  </ComponentWarper>
                );
              }
            })}
          </Grid>
        );
      })}
    </Grid>
  );
};
