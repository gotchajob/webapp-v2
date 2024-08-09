"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { FlexCenter } from "components/common/box/flex-box";
import { ContainedLoadingButton } from "components/common/button/loading-button";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { apiClientFetch } from "package/api/api-fetch";
import { VerifyForgetPasswordRequest, VerifyForgetPasswordResponse } from "package/api/user/verify-forget-password";
import { useState } from "react";
import * as yup from "yup";
import { VerifyPassword } from "../verify-password";
import { Input } from "components/common/input/input";
import { Text } from 'components/common/text/text';
import useSnackbarDialog from "components/common/snackbar-dialog/snackbar-dialog";

export const ResetPasswordForm = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const { showSnackbarDialog, SnackbarDialog } = useSnackbarDialog();
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (value: any) => {
    try {
      setIsLoading(true);
      const params: VerifyForgetPasswordRequest = {
        code,
        email,
        password: value.password,
      };
      const data: VerifyForgetPasswordResponse = await apiClientFetch(
        "/api/user/verify-forget-password",
        params
      );
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      if (window) {
        window.location.href = "/";
      }
    } catch (error: any) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initialValues = {
    password: "",
    rePassword: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });

  return (
    <Box sx={{ maxWidth: "380px", width: "100%", margin: "auto" }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2.5} paddingY={4}>
          <Text
            style={{ maxWidth: "380px", width: "100%" }}
            textAlign={"center"}
            fontWeight={"300"}
            fontSize={14}
          >
            Thiết lập lại mật khẩu
          </Text>
          <Input
            name="password"
            onBlur={handleBlur}
            value={values.password}
            onChange={handleChange}
            error={!!touched.password && !!errors.password}
            helperText={(touched.password && errors.password) as string}
            style={{ width: "100%" }}
            placeholder="Mật khẩu"
            type="password"
          />
          <VerifyPassword input={values.password} />
          <Input
            name="rePassword"
            onBlur={handleBlur}
            value={values.rePassword}
            onChange={handleChange}
            error={!!touched.rePassword && !!errors.rePassword}
            helperText={(touched.rePassword && errors.rePassword) as string}
            style={{ width: "100%" }}
            placeholder="Xác nhận mật khẩu"
            type="password"
          />
        </Stack>
        <FlexCenter>
          <ContainedLoadingButton loading={isLoading} type="submit">
            Xong
          </ContainedLoadingButton>
        </FlexCenter>
      </form>
    </Box>
  );
};

const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Tối thiểu 8 kí tự")
    .matches(/^(?=.*[0-9])/, "Ít nhất 1 chữ số (0-9)")
    .matches(/^(?=.*[A-Z])/, "Ít nhất 1 kí tự viết hoa (A-Z)"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please re-type password"),
});
