"use client";

import { FlexCenter } from "components/common/box/flex-box";
import Grid from "@mui/material/Grid";
import { CVPriceCard } from "components/card/price-card/cv-price-card";
import { MockInterviewPriceCard } from "components/card/price-card/mock-interview-price-card";
import { PartnerTrainingPriceCard } from "components/card/price-card/partner-training-price-card";
import { SmartTUMPriceCard } from "components/card/price-card/smart-tum-price-card";
import { MainTitle } from "components/common/text/text";
import { cookies } from "next/headers";
import { UserCurrent } from "package/api/user/current";
import { getUserToken } from "package/cookies/token";

export const PriceList = async () => {
  const accessToken = await getUserToken(cookies())
  const user = await UserCurrent(accessToken)
  return (
    <>
      <MainTitle py={10} pt={30} id={"priceDiv"}>
        Giá cả
      </MainTitle>
      <Grid container sx={{ maxWidth: "760px" }}>
        <Grid item xs={12} sm={6}>
          <FlexCenter>
            <MockInterviewPriceCard user={user} />
          </FlexCenter>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            marginTop: {
              xs: 10,
              sm: "0px !important",
            },
          }}
        >
          <FlexCenter>
            <PartnerTrainingPriceCard />
          </FlexCenter>
        </Grid>
        <Grid item xs={12} sm={6} marginTop={10}>
          <FlexCenter>
            <CVPriceCard />
          </FlexCenter>
        </Grid>
        <Grid item xs={12} sm={6} marginTop={10}>
          <FlexCenter>
            <SmartTUMPriceCard />
          </FlexCenter>
        </Grid>
      </Grid>
    </>
  );
};
