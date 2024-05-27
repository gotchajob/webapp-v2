import Box, { BoxProps } from "@mui/material/Box";

export const StyledCard = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      style={{
        boxShadow: "0px 0px 20px 0px rgba(8, 78, 118, 0.20)",
        borderRadius: "16px",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
export const ContainedCard = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      sx={{
        bgcolor: "#e3f1f9",
        borderRadius: 2,
        px: 1.5,
        width: "fit-content",
        py: 1,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
