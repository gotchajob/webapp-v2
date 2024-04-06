import { apiServerFetch, errorSystem } from "../api-fetch";

export interface Question {
  id: string;
  question: string;
}
export interface QuestionRequest {
  questionId: string;
}
export interface QuestionResponse {
  status: string;
  responseText: string;
  data: Question[];
}
export const QuestionList = async (
  params: QuestionRequest,
  accessToken: string
): Promise<QuestionResponse> => {
  try {
    const res = await apiServerFetch(
      "/question?type=" + params.questionId,
      "GET",
      undefined,
      accessToken
    );
    if (res.status === "error") {
      throw new Error(res.responseText)
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy danh sách câu hỏi", []);
  }
};
