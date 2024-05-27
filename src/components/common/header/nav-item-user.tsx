"use client";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { PRIMARYCOLOR } from "components/common/config";
import { Text } from "components/common/text/text";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { apiClientFetch } from "package/api/api-fetch";
import { FlexBetween } from "../box/flex-box";
import { useState } from "react";

export const NavigationItem = () => {

  const navItemList = [
    { name: "Dịch vụ", targetId: "serviceDiv", icon: ArrowDropDownIcon },
    { name: "Đội ngũ", targetId: "mentorDiv", icon: ArrowDropDownIcon },
    { name: "Blog", targetId: "blogDiv", icon: ArrowDropDownIcon },
  ];

  const [activeNav, setActiveNav] = useState(false);

  const handleClick = (targetId: string) => {
    if (document !== null) {
      //@ts-ignore
      document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {navItemList.map((navItem) => (
        <FlexBetween
          sx={{
            cursor: "pointer",
            width: navItem.icon ? "170px" : "fit-content",
            padding: 1.5,
            paddingLeft: 3,
            paddingRight: 3,
            '&:not(:last-child)': {
              marginRight: 2,
            },
            textDecoration: activeNav === true ? "underline" : "none",
          }}
          key={navItem.targetId}
          onClick={() => {
            handleClick(navItem.targetId);
          }}
        >
          <Text color={PRIMARYCOLOR} fontWeight={"bold"}>
            {navItem.name}
          </Text>
          {navItem.icon ? <ArrowDropDownIcon color="primary" /> : null}
        </FlexBetween>
      ))}
      <Box
        component={Link}
        p={1.5}
        pl={3}
        pr={3}
        href={"/cv"}
        sx={{
          textDecoration: "none",
        }}
      >

        <Text color={PRIMARYCOLOR} fontWeight={"bold"}>
          CVs
        </Text>
      </Box>
    </>
  );
};

export const LogoutButton = () => {
  const onClick = async () => {
    try {
      const res = await apiClientFetch("/api/user/logout");
      if (res.status === "error") {
        throw new Error("Không thể đăng xuất");
      }
      enqueueSnackbar(res.responseText, {
        variant: "success",
      });
      window.location.href = "/"
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    }
  };
  return (
    <IconButton size="medium" onClick={onClick}>
      <LogoutIcon
        sx={{
          width: 26,
          height: 26,
        }}
        color="primary"
      />
    </IconButton>
  );
};
