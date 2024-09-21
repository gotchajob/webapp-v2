import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetCheckBuyService } from "package/api/customer/check-buy-service";
import { getUserToken } from "package/cookies/token";

import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {

    // const customerToken = getUserToken(cookies());

    // const data = await GetCheckBuyService(customerToken);

    // console.log("layout", data);

    // if (data.status == "success") {
    //     redirect("/share-cv");
    // }

    return <>{children}</>
}