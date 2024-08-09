"use client";

import Stack from "@mui/material/Stack";
import { ContainedButton } from "components/common/button/button";
import { Text } from "components/common/text/text";
import { enqueueSnackbar } from "notistack";
import { apiClientFetch } from "package/api/api-fetch";
import { SubscribeNewsResponse } from "package/api/subscribe-news";
import { useState } from "react";
import { Input } from "../input/input";
import useSnackbarDialog from "../snackbar-dialog/snackbar-dialog";

export const SubscribeForm = () => {
  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();
  const [input, setInput] = useState("");
  const handleClick = async () => {
    try {
      const data: SubscribeNewsResponse = await apiClientFetch(
        "/api/subscribe-news",
        { email: input }
      );
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      enqueueSnackbar("Đã gửi thành công", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "success",
      });
    } finally {
    }
  };
  return (
    <Stack spacing={3}>
      <Text fontSize={15} color={"white"} fontWeight={200}>
        Đăng ký bằng Email của bạn để nhận được tin tức mới nhất của chúng tôi
      </Text>
      <Input
        placeholder="Email"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></Input>
      <ContainedButton
        sx={{
          width: "fit-content",
        }}
        onClick={handleClick}
      >
        Đăng kí
      </ContainedButton>
    </Stack>
  );
};
