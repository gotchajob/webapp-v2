import { Avatar, CardContent, Divider, Grid, Stack, Typography } from "@mui/material";
import MainCard from "ui-component/cards/MainCard";

const ManageCVPage = () => {
    return (
        <Grid container px={20} py={5} spacing={3}>
            <Grid item xs={8}>
                <MainCard>
                    <CardContent>
                        <Typography variant="h2">CV đã tạo trên GotchaJob</Typography>
                        <Divider sx={{ my: 2 }} />
                    </CardContent>
                </MainCard>
            </Grid>
            <Grid item xs={4}>
                <Stack direction={"column"} spacing={10}>
                    <MainCard>
                        <CardContent>
                            <Avatar alt="User 1" sx={{ height: 80, width: 80 }} />
                            <Stack>
                                    
                            </Stack>
                        </CardContent>
                    </MainCard>
                    <MainCard>
                        <CardContent>
                            <Typography variant="h2">Bộ lọc</Typography>
                            <Divider sx={{ my: 2 }} />
                        </CardContent>
                    </MainCard>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default ManageCVPage;