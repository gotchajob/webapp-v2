"use client";

import CardMedia from "@mui/material/CardMedia";
export const Media = () => {

  return (
    <CardMedia
      component={"video"}
      controls={true}
      sx={{
        width: {
          xs: "100%",
          800: "800px !important"
        }
      }}
      src="/assets/videos/demo.mp4"
    />
  );
};
