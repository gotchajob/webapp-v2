import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CreateCVHeader from 'app/(user)/create-cv/_component/CreateCVHeader';
import TabsTable from 'app/(user)/create-cv/_component/TabsTable';
import { CVTemplate, Column, PersonalComponent } from 'components/cv-component/interface';
import { useState } from 'react';
import { CVUploadImage } from './avatar';
import { HeaderComponent } from './header-component';
import { InformationComponent } from './information-component';

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

export const CreateCV = ({ data }: { data: CVTemplate }) => {

  const [historyTemplate, setHistoryTemplate] = useState<CVTemplate[]>([]);

  const [currentTemplate, setCurrentTemplate] = useState(data);

  const [numberColumn, setNumberColumn] = useState(1);

  const handleSelectNumberColumn = (value: number) => {
    setNumberColumn(value);
  };

  // const handelChangeComponent = (newCVComponent: CVComponent, componentIndex: number, columnIndex: number) => {
  //   console.log("handelChangeComponentList value:", newCVComponent);
  //   const newTemplate = { ...currentTemplate };
  //   setHistoryTemplate([...historyTemplate, currentTemplate]);
  //   newTemplate.layout[columnIndex].componentList[componentIndex] = newCVComponent;
  //   setCurrentTemplate(newTemplate);
  // }

  const handelChangeHeaderComponent = (newCVLayout: Column[]) => {
    if (newCVLayout) {
      const newTemplate = { ...currentTemplate, layout: [...newCVLayout] };
      setHistoryTemplate([...historyTemplate, currentTemplate]);
      setCurrentTemplate(newTemplate);
    }
  }

  const handleChangeInformationComponent = (newCVPersonal: PersonalComponent[]) => {
    console.log(" handleChangeInformationComponent:", newCVPersonal);
    if (newCVPersonal) {
      const newTemplate = { ...currentTemplate, }
    }
  }

  return (
    <>
      <CreateCVHeader />

      <Grid container padding={3}>
        <Grid item xs={4} spacing={3} >
          <TabsTable />
        </Grid>

        <Grid item xs={8}>
          <Grid container component={Paper} maxWidth={900} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
            {currentTemplate && currentTemplate.layout ? (
              currentTemplate.layout.map((column, columnIndex) => {
                return (
                  <Grid key={columnIndex} xs={column.size} minHeight={100} bgcolor={column.color} p={2}>
                    {column.componentList.map((row, rowIndex) => {
                      if (row.dataType === 'image') {
                        return <CVUploadImage key={rowIndex} avatar={row.description} />;
                      }
                      if (row.dataType === 'information') {
                        return <InformationComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} information={currentTemplate.personal} onChangePersonal={handleChangeInformationComponent} />;
                      }
                      if (row.dataType === 'text') {
                        return <HeaderComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} onChangeLayout={handelChangeHeaderComponent} />;
                      }
                    })}
                  </Grid>
                );
              })
            ) : (
              <>loading</>
            )}
          </Grid>
        </Grid>
      </Grid>

    </>
  );
};