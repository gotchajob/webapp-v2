'use client'

import { Typography } from "@mui/material";
import { useGetCustomer } from "hooks/use-get-current-user";
import { CustomerToken } from "hooks/use-login";

export default function CustomerTokenPage() {
  const { customerToken } = CustomerToken();

  const { customer } = useGetCustomer(customerToken);


  return (
    <>
      <Typography>test</Typography>
      <Typography>{customerToken}</Typography>
      <Typography>{JSON.stringify(customer)}</Typography>
    </>
  )
}
