import Grid from "@mui/material/Grid";
import { ImageCard } from "components/common/image/image-card";
import { Suspense } from "react";
import { Tabs } from "./_component/tab";

export default async function Page() {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={5}>
          <Suspense fallback={null}>
            <Tabs />
          </Suspense>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={6}>
          <ImageCard src="/assets/images/quick-interview-test.png" />
        </Grid>
      </Grid>
    </>
  );
}
