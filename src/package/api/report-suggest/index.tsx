import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetReportSuggestRequest {}
export interface GetReportSuggestResponse {
  status: string;
  responseText: string;
  data: ReportSuggest[];
}
export interface ReportSuggest {
  id: number;
  report: string;
}

export const GetReportSuggest = async (params: GetReportSuggestRequest): Promise<GetReportSuggestResponse> => {
  try {
    const res = await apiServerFetch('/report-suggest', 'GET');
    return res
  } catch (error: any) {
    return errorSystem('Lỗi không lấy được yêu cầu', []);
  }
};
