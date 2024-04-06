"use client";
import { PRIMARYCOLOR } from "../config";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
export const ContainedLoadingButton = ({
  children,
  ...props
}: LoadingButtonProps) => {
  return (
    <LoadingButton
      variant="contained"
      color="primary"
      {...props}
      sx={{
        backgroundColor: PRIMARYCOLOR,
        textTransform: "none",
        height: "40px",
        padding: "2px",
        paddingLeft: "25px",
        paddingRight: "25px",
        borderRadius: 30,
        boxShadow: "none",
        fontWeight: 500,
        fontSize: "1.1rem",
        letterSpacing: 1,
        ...props.sx,
      }}
    >
      {children}
    </LoadingButton>
  );
};
