"use client";

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
import { StyledLink } from 'components/common/link/styled-link';

const fontOptions = [
    { label: 'Arial' },
    { label: 'Verdana' },
    { label: 'Times New Roman' },
    { label: 'Courier New' },
    { label: 'Roboto' },
    { label: 'Open Sans' },
    { label: 'Montserrat' },
];

const spacingData = [
    { spacing: 1.2 },
    { spacing: 1.3 },
    { spacing: 1.4 },
    { spacing: 1.5 },
    { spacing: 1.6 },
    { spacing: 1.7 },
    { spacing: 1.8 },
];

const CreateCVHeader = () => {
    return (
        <Grid container item alignItems="center" sx={{ boxShadow: 3 }}>
            <Grid item xs={12} py={1} sx={{ borderBottom: '1px solid #E6E6E6', paddingBottom: "10px" }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingX: 5
                    }}
                >
                    <TextField placeholder="CV chưa đặt tên" />
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant='contained'
                            sx={{
                                paddingX: "10px",
                                backgroundColor: '#59ABD9',
                                '&:hover': {
                                    backgroundColor: '#1976D2',
                                },
                                color: 'white',
                            }}
                        >
                            <RemoveRedEyeIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                            Xem trước
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                paddingX: "10px",
                                backgroundColor: '#59ABD9',
                                '&:hover': {
                                    backgroundColor: '#1976D2',
                                },
                                color: 'white',
                            }}
                        >
                            <SaveAltIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                            Lưu và tải xuống
                        </Button>
                        <Button
                            variant='contained'
                            sx={{
                                paddingX: "10px",
                                backgroundColor: '#1976D2',
                                color: 'white',
                            }}
                        >
                            <SaveIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                            Lưu lại
                        </Button>
                    </Stack>
                </Box>
            </Grid>
            <Grid item xs={12} py={1} sx={{ paddingTop: "10px" }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: "space-evenly",
                    paddingX: 35,
                }}>
                    <Stack>
                        <Button
                            variant="text"
                            sx={{
                                paddingX: "10px",
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                            }}
                        >
                            Màu chủ đề
                            <InvertColorsIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                        </Button>
                    </Stack >
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Stack>
                        <Button
                            variant="text"
                            sx={{
                                paddingX: "10px",
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                            }}
                        >
                            <ImageIcon sx={{ fontSize: 35, paddingX: "5px" }} />
                            Hình nền CV
                        </Button>
                    </Stack >
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Button variant="text"><UndoIcon sx={{ fontSize: 20 }} /></Button>
                    <Button variant="text"><RedoIcon sx={{ fontSize: 20 }} /></Button>
                    <StyledLink href="/share-cv">
                        <Button variant="text">Tìm kiếm Expert</Button>
                    </StyledLink>
                </Box>
            </Grid>
        </Grid>
    )
}

export default CreateCVHeader;