"use client";
import Grid from "@mui/material/Grid";
import { FlexBetween } from "components/common/box/flex-box";
import { ContainedButton } from "components/common/button/button";
import { Input } from "components/common/input/input";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
// import { AdviceServiceRequest, AdviceServiceResponse } from "package/api/advice-service";
import { apiClientFetch } from "package/api/api-fetch";
import * as yup from "yup";

export const ContactForm = () => {
  const handleSubmitForm = async (values: any) => {
    // try {
    //   const params: AdviceServiceRequest = {
    //     advise: values.description,
    //     email: values.email,
    //     phone: values.phone,
    //     fullName: values.name
    //   }
    //   const data: AdviceServiceResponse = await apiClientFetch(
    //     "/api/advice-service",
    //     params
    //   );
    //   if (data.status === "error") {
    //     throw new Error(data.responseText);
    //   }
    //   enqueueSnackbar("Đã gửi thành công", {
    //     variant: "success",
    //   });
    // } catch (error: any) {
    //   enqueueSnackbar(error.message, {
    //     variant: "error",
    //   });
    // } finally {
    // }
  };
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    description: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Bắt buộc"),
    phone: yup.string(),
    email: yup.string().required("Bắt buộc"),
    description: yup.string().required("Bắt buộc"),
  });
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleSubmitForm,
      initialValues,
      validationSchema,
    });
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Input
            style={{ width: "100%" }}
            name="name"
            onBlur={handleBlur}
            value={values.name}
            onChange={handleChange}
            placeholder="Họ và tên"
            error={!!touched.name && !!errors.name}
            helperText={(touched.name && errors.name) as string}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input
            style={{ width: "100%" }}
            name="phone"
            onBlur={handleBlur}
            value={values.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            error={!!touched.phone && !!errors.phone}
            helperText={(touched.phone && errors.phone) as string}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Input
            style={{ width: "100%" }}
            name="email"
            onBlur={handleBlur}
            value={values.email}
            onChange={handleChange}
            placeholder="Email"
            error={!!touched.email && !!errors.email}
            helperText={(touched.email && errors.email) as string}
          />
        </Grid>
        <Grid item xs={12} sm={9.5}>
          <Input
            multiline
            rows={4}
            style={{ width: "100%" }}
            name="description"
            onBlur={handleBlur}
            value={values.description}
            onChange={handleChange}
            placeholder="Dịch vụ cần tư vấn"
            error={!!touched.description && !!errors.description}
            helperText={(touched.description && errors.description) as string}
          />
        </Grid>
        <Grid item xs={12} md={2.5}>
          <FlexBetween alignItems={"flex-end"} height={"90%"}>
            <div></div>
            <ContainedButton type="submit">Gửi</ContainedButton>
          </FlexBetween>
        </Grid>
      </Grid>
    </form>
  );
};
