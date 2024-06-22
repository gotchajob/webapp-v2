"use client";

import React from 'react';
import { Grid, Paper, Typography } from "@mui/material";
import { CVUploadImage } from 'components/cv-component/avatar';
import { InformationComponent } from 'components/cv-component/information-component';
import { HeaderComponent } from 'components/cv-component/header-component';
import { CVTemplate } from 'components/cv-component/interface';

const CV = CVTemplate;

const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

const CVCurremtTemplate = () => {

    return (
        <Grid container component={Paper} maxWidth={900} margin={'auto'} sx={{ boxShadow: defaultShadow }}>
            {CV && CV.layout ? (
                CV.layout.map((column, columnIndex) => (
                    <Grid key={columnIndex} xs={column.size} minHeight={100} bgcolor={column.color} p={2}>
                        {column.componentList.map((row, rowIndex) => {
                            switch (row.dataType) {
                                case 'image':
                                    return <CVUploadImage key={rowIndex} avatar={row.description} />;
                                case 'information':
                                    return <InformationComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} information={CV.personal} onChangePersonal={() => { }} />;
                                case 'text':
                                    return <HeaderComponent key={rowIndex} columnIndex={columnIndex} componentIndex={rowIndex} component={row} onChangeLayout={() => { }} />;
                                default:
                                    return null;
                            }
                        })}
                    </Grid>
                ))
            ) : (
                <Grid item xs={12} textAlign="center" p={2}>
                    <Typography variant="body1">Loading...</Typography>
                </Grid>
            )}
        </Grid>
    );
}

export default CVCurremtTemplate;
