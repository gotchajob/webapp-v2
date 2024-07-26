import { accessToken } from 'mapbox-gl';
import { CVCurrent, getCVCurrent } from "package/api/cv/current"
import { CVById, getCVById, getCVByIdRq } from 'package/api/cv/id';
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

export const useGetCVById = (params: getCVByIdRq, accessToken: string) => {
    const [cv, setCV] = useState<CVById>();

    const [loading, setLoading] = useState<boolean>();

    const fetchCVById = async () => {
        try {
            setLoading(true);
            const data = await getCVById(params, accessToken);
            setCV(data.data);
            setLoading(false);
        } catch (error) {
        }
    }

    useEffect(() => { fetchCVById(); }, [accessToken, params]);

    return {
        cv, loading
    }
}