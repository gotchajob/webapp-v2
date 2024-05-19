"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { FlexBox, FlexCenter } from "components/common/box/flex-box";
import { ImageCard } from "components/common/image/image-card";
import { MainTitle, Text } from "components/common/text/text";
import { ContactForm } from "components/forms/contact-form.tsx/contact-form";
import { GoogleMap } from "components/map/google-map";

export const Contact = () => {
  return (
    <>
      <MainTitle py={10} pt={30}>
        Liên hệ chúng tôi
      </MainTitle>
      <Grid container maxWidth={1200}>
        <Grid item xs={12} mb={15}>
          <FlexCenter>
            <GoogleMap />
          </FlexCenter>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            marginBottom: {
              xs: 15,
              sm: "0px !important",
            },
          }}
        >
          <Stack spacing={4} maxWidth={624} margin={"auto"}>
            <InformationLine
              image="/assets/icon/location.png"
              title="Địa chỉ:"
              subtitle="Vinhomes Grand Park,P.Long Thạnh Mỹ, Quận 9, Tp.HCM"
            />
            <InformationLine
              image="/assets/icon/email.png"
              title="Email:"
              subtitle="gotchajob.vn@gmail.com"
            />
            <InformationLine
              image="/assets/icon/phone.png"
              title="Số điện thoại:"
              subtitle="+84 0941 244 285"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FlexCenter maxWidth={624} margin={"auto"}>
            <ContactForm />
          </FlexCenter>
        </Grid>
      </Grid>
    </>
  );
};

const InformationLine = ({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle: string;
}) => {
  return (
    <FlexBox alignItems={"center"}>
      <ImageCard src={image} width={"35px"} />
      <Box marginLeft={1}>
        <Text fontWeight={"700"} fontSize={16}>
          {title}
        </Text>
        <Text fontSize={12}>{subtitle}</Text>
      </Box>
    </FlexBox>
  );
};
