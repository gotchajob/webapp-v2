"use client";

import { UpdateAccess } from "package/api/access";
import { formatDate } from "package/util";
import { useEffect } from "react";

export const UpdateAccessServer = ({ accessTime }: { accessTime: string }) => {
  const handleUpdateAccess = async () => {
    const currentDate = new Date();
    if (accessTime !== formatDate(currentDate.toISOString(), "dd/MM/yyyy")) {
      const res = await UpdateAccess({});
      console.log(res);
    }
  };
  useEffect(() => {
    handleUpdateAccess();
  }, []);
  return <></>;
};
