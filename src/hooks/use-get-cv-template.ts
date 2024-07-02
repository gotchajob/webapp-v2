
import { CVTemplate, CVTemplateRequest, GetCVTemplate } from './../package/api/cv-template/index';
import { useEffect, useState } from 'react';
import { CVTemplateById, CVTemplateByIdRequest, GetCVTemplateById } from 'package/api/cv-template/id';

export const UseGetCVTemplate = (params: CVTemplateRequest) => {
    const [CVTemplateList, setCVTemplateList] = useState<CVTemplate[]>([])

    const [loading, setLoading] = useState(false);

    const fetchCVTemplate = async () => {
        try {
            setLoading(true);
            const data = await GetCVTemplate(params);
            setCVTemplateList(data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCVTemplate(); }, [params.cvCategoryId]);
    return ({ CVTemplateList, loading })
}

export const UseGetCVTemplateById = (params: CVTemplateByIdRequest) => {
    const [CVTemplateById, setCVTemplateById] = useState<CVTemplateById>()

    const [loading, setLoading] = useState(false);

    const fetchCVTemplateById = async () => {
        try {
            setLoading(true);
            const data = await GetCVTemplateById(params);
            setCVTemplateById(data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCVTemplateById(); }, [params.id]);
    return ({ CVTemplateById, loading })
}