"use client";

import MenuIcon from "@mui/icons-material/Menu";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";

export const MenuDrawler = ({ ...props }: IconButtonProps) => {
  return (
    <IconButton
      {...props}
      size="large"
      sx={{
        ...props.sx,
      }}
    >
      <MenuIcon color="primary" />
    </IconButton>
  );
};
