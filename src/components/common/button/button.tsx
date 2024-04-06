import Button, { ButtonProps } from "@mui/material/Button";
import { PRIMARYCOLOR } from "../config";
import IconButton from "@mui/material/IconButton";

export const ContainedButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
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
        ...props.sx
      }}
    >
      {children}
    </Button>
  );
};


export const OutlinedButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      {...props}
      sx={{
        border: `2px solid ${PRIMARYCOLOR} !important`,
        textTransform: "none",
        borderRadius: 30,
        height: "40px",
        padding: "2px",
        paddingLeft: "25px",
        paddingRight: "25px",
        boxShadow: "none",
        fontWeight: 500,
        width: "fit-content",
        fontSize: "1.1rem",
        letterSpacing: 1,
        ...props.sx
      }}
    >
      {children}
    </Button>
  );
};
export const OutlinedIconButton = ({ children, ...props }: ButtonProps) => {
  return (
    <IconButton
      variant="outlined"
      color="primary"
      size="small"
      {...props}
      sx={{
        border: `2px solid ${PRIMARYCOLOR} !important`,
        textTransform: "none",
        borderRadius: 30,
        padding: 1,
        boxShadow: "none",
        fontWeight: 500,
        fontSize: "1.1rem",
        letterSpacing: 1,
        ...props.sx
      }}
    >
      {children}
    </IconButton>
  );
};

