import { FlexCenter } from "@/components/common/flex-box";
import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <Grid container>
      <Grid item xs={12} sm={7} px={1}>
        {children}
      </Grid>
      <Grid
        item
        xs={5}
        sx={{
          display: {
            xs: "none",
            sm: "block !important",
          },
        }}
      >
        <FlexCenter bgcolor={"#D9D9D9"} height={"100vh"}></FlexCenter>
      </Grid>
    </Grid>
  );
}
