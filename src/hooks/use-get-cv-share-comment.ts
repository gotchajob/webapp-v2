
import { CVShareComment, GetCVShareComment, GetCVShareCommentReq } from "package/api/cv-share-comment";
import { GetCVShareCommentById, GetCVShareCommentByIdReq } from "package/api/cv-share-comment/id";
import { useEffect, useState } from "react";

export const useGetCVShareComment = (params: GetCVShareCommentReq, accessToken: string, refresh: number) => {
    const [cvShareComment, setCVShareComment] = useState<CVShareComment>({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchCVShareComment = async () => {
        try {
            if (!accessToken) {
                return;
            }
            setLoading(true);
            const data = await GetCVShareComment(params, accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setCVShareComment(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCVShareComment() }, [accessToken, params.pageNumber, params.pageSize, params.cvShareId, params.sortBy, refresh]);

    return {
        cvShareComment, loading
    }
}

export const useGetCVShareCommentById = (params: GetCVShareCommentByIdReq, accessToken: string, refresh: number) => {
    const [cvShareCommentById, setCVShareCommentById] = useState({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchCVShareComment = async () => {
        try {
            if (!accessToken) {
                return;
            }
            setLoading(true);
            const data = await GetCVShareCommentById(params);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setCVShareCommentById(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchCVShareComment() }, [accessToken, params.id, refresh]);

    return {
        cvShareCommentById, loading
    }
}