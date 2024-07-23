import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GetCheckBuyService } from "package/api/customer/check-buy-service";
import { getUserToken } from "package/cookies/token";
import { ReactNode } from "react";

export default async function layout({ children }: { children: ReactNode }) {
    const customerToken = getUserToken(cookies());

    const data = await GetCheckBuyService(customerToken);

    if (data.status !== "success") {
        redirect("http://localhost:3001/dang-ky-phong-van");
    }

    return <>{children}</>
}