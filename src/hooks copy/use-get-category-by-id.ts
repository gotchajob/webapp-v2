import { CVCategoryById, CVCategoryByIdRequest, GetCVCategoryById } from 'package/api/cv-category/id';
import { useEffect, useState } from 'react';
import { GetCVTemplate } from './../package/api/cv-template/index';

export const UseGetCategoryById = (params: CVCategoryByIdRequest) => {
    const [categoryById, setCategoryById] = useState<CVCategoryById>();

    const [loading, setLoading] = useState(false);

    const fetchCategoryById = async () => {
        try {
            setLoading(true);
            const data = await GetCVCategoryById(params);
            setCategoryById(data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCategoryById(); }, [params.id]);
    return ({ categoryById, loading })
}