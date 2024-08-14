import { GetReportSuggest, GetReportSuggestRequest, ReportSuggest } from "package/api/report-suggest"
import { useEffect, useState } from "react"

export const useGetReportSuggest = (params: GetReportSuggestRequest) => {
    const [reportSuggest, setReportSuggest] = useState<ReportSuggest[]>([])

    const getReportSuggest = async() => {
        const data =await GetReportSuggest(params)
        setReportSuggest(data.data)
    }

    useEffect(() => {
        getReportSuggest()
    }, [])

    return {
        reportSuggest
    }
}