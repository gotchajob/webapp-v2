
import Box from "@mui/material/Box";
import { Footer } from "components/common/footer/footer";
import { Header } from "components/common/header/header";
import { cookies } from "next/headers";
import { getUserToken } from "package/cookies/token";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userToken = getUserToken(cookies())
  return (
    <>
      <Header alreadyLogin={userToken !== ""} />
      <Box mt={"96px"}>{children}</Box>
      <Footer />
    </>
  );
}
