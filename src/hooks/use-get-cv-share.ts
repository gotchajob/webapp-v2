import { CVShare, GetCVShare, GetCVShareReq } from "package/api/cv-share";
import { useEffect, useState } from "react";

export const useGetCVShare = (params: GetCVShareReq, accessToken: string, refresh: number) => {
    const [cvShare, setCVShare] = useState<CVShare>({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchCVShare = async () => {
        try {
            if (!accessToken) {
                return;
            }
            setLoading(true);
            const data = await GetCVShare(params, accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setCVShare(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCVShare() }, [accessToken, params.pageNumber, params.pageSize, params.search, params.sortBy, refresh]);

    return {
        cvShare, loading
    }
}
