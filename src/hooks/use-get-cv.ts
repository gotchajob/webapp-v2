import { accessToken } from 'mapbox-gl';
import { CVCurrent, getCVCurrent } from "package/api/cv/current"
import { useEffect, useState } from "react";

export const useGetCVCurrent = (accessToken: string, refreshTime: any) => {
    const [cvs, setCVs] = useState<CVCurrent[]>();

    const [loading, setLoading] = useState<boolean>();

    const fetchCVCurrent = async () => {
        try {
            setLoading(true);
            const data = await getCVCurrent(accessToken);
            setCVs(data.data);
            setLoading(false);
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => { fetchCVCurrent(); }, [accessToken, refreshTime]);

    return {
        cvs, loading
    }
}