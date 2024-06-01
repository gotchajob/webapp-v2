'use client';

import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import { TreeItem, TreeView } from '@mui/x-tree-view';
import Chip from 'ui-component/extended/Chip';
import Experts from "./expert-list";

// assets
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';

export default function ShareCv() {

    const filter_box = [
        { label: 'Kế Toán', id: 1 },
        { label: 'Software engineer', id: 2 },
        { label: 'Thương mại quốc tế', id: 3 },
        { label: 'Logistic', id: 4 },
        { label: 'Data engineer', id: 5 }
    ];

    const filter_rating = [
        { label: 'Đánh giá từ cao đến thấp', id: 1 },
        { label: 'Đánh giá từ thấp đến cao', id: 2 },
        { label: 'Đánh giá 5 sao', id: 3 },
        { label: 'Đánh giá 4 sao', id: 4 },
        { label: 'Đánh giá 3 sao', id: 5 },
    ];

    const filter_nation = [
        { label: 'Anh', id: 1 },
        { label: 'Nga', id: 2 },
        { label: 'Việt Nam', id: 3 },
        { label: 'Trung Quốc', id: 4 }
    ];

    const filter_exp = [
        { label: 'Kinh nghệm từ cao đến thấp', id: 1 },
        { label: 'Kinh nghiệm từ thấp đến cao', id: 2 },
        { label: 'Kinh nghiệm trên 1 năm', id: 3 },
        { label: 'Kinh nghiệm trên 3 năm', id: 4 }
    ];

    const filter_position = [
        { label: 'Thực Tập', id: 1 },
        { label: 'Back end', id: 2 },
        { label: 'Front end', id: 3 },
        { label: 'Data analysis', id: 4 }
    ];

    return (
        <Grid container justifyContent="center" alignItems="center">

            {/* Filter section 1 */}
            <Grid
                item
                xs={12}
                sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    height: 270,
                }}>
                {/* BackgroundImage */}
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url(https://mentori.vn/upload/banners/kts1554959520.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(50%)',
                        zIndex: 1,
                    }}
                />
                <Grid container sx={{
                    position: 'relative',
                    zIndex: 2,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    padding: 2,
                    paddingLeft: 40,
                }}>
                    <Grid item xs={12} my={2}>
                        <Typography
                            sx={{
                                color: '#0782C6',
                                fontWeight: 'bold',
                                fontSize: '2.5rem',
                                textAlign: 'left',
                            }}>
                            CỘNG ĐỒNG EXPERT CỦA GOTCHAJOB
                        </Typography>
                        <Typography
                            sx={{
                                color: 'white',
                                fontSize: '1.25rem',
                                textAlign: 'left',
                            }}>
                            Tiến nhanh và xa hơn trong hành trình sự nghiệp cùng GOTCHAJOB
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{
                        position: 'relative',
                        zIndex: 2,
                    }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Stack direction={'row'} spacing={2}>
                                <TextField placeholder="Nhập tên expert" sx={{ width: 500, borderRadius: 10, }} />
                                <Autocomplete
                                    multiple
                                    options={filter_box}
                                    filterSelectedOptions
                                    renderOption={(props, option) => {
                                        return (
                                            <li {...props} key={option.id}>
                                                {option.label}
                                            </li>
                                        );
                                    }}
                                    renderTags={(tagValue, getTagProps) => {
                                        return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.id} label={option.label} />);
                                    }}
                                    renderInput={(params) => <TextField {...params} placeholder="Chọn ngành nghề"
                                        sx={{ width: 300, borderRadius: 10, }}

                                    />}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon />}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'white',
                                        width: 150,
                                        maxHeight: 50,
                                        borderRadius: 10,
                                    }}
                                >
                                    Tìm kiếm
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Filter section 2 */}
            <Grid item xs={12} sx={{ boxShadow: defaultShadow }} my={3} mx={40}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                    <TreeItem nodeId="1" label="Bộ lọc" sx={{ backgroundColor: "#f1f8fc", boxShadow: defaultShadow }}>
                        <Stack direction={'row'} spacing={2} my={2} mx={1}>
                            <Autocomplete
                                disableClearable
                                options={filter_rating}
                                defaultValue={filter_rating[1]}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm theo đánh giá" />}
                                sx={{ width: 200, }}
                            />
                            <Autocomplete
                                disableClearable
                                options={filter_nation}
                                defaultValue={filter_nation[1]}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm theo quốc gia" />}
                                sx={{ width: 200, }}
                            />
                            <Autocomplete
                                disableClearable
                                options={filter_exp}
                                defaultValue={filter_exp[1]}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm theo kinh nghiệm" />}
                                sx={{ width: 200, }}
                            />
                            <Autocomplete
                                disableClearable
                                options={filter_position}
                                defaultValue={filter_position[1]}
                                renderInput={(params) => <TextField {...params} label="Tìm kiếm theo vị trí" />}
                                sx={{ width: 200, }}
                            />
                            <TextField placeholder="Lịch rảnh" sx={{ width: 200, }} />
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    cursor: 'pointer',
                                    color: 'white',
                                    width: 130,
                                    maxHeight: 50,
                                    borderRadius: 10,
                                }}
                            >
                                Áp dụng
                            </Button></Stack>
                    </TreeItem>
                </TreeView>
            </Grid>

            {/* Expert List */}
            <Grid item xs={12} my={1} mx={40}>
                <Experts></Experts>
            </Grid>
        </Grid >
    );
}