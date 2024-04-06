import { apiServerFetch, errorSystem } from "../api-fetch";

export interface QuestionTypeRequest {}
export interface QuestionTypeResponse {
  status: string;
  responseText: string;
  data: QuestionType[];
}
export interface QuestionType {
  id: string;
  name: string;
}
export const QuestionTypeList = async (): Promise<QuestionTypeResponse> => {
  try {
    const res = await apiServerFetch("/question-type", "GET");
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy danh sách câu hỏi", []);
  }
};
