import { apiServerFetch, errorSystem } from "../api-fetch";

export interface Answer {
  questionId: string;
  answer: string;
}
export interface SendAnswerRequest {
  answerList: Answer[];
}
export interface SendAnswerResponse {
  status: string;
  responseText: string;
  data: string;
}
export const SendAnswer = async (
  params: SendAnswerRequest,
  accessToken: string
): Promise<SendAnswerResponse> => {
  try {
    const res = await apiServerFetch(
      "/answer",
      "POST",
      params,
      accessToken
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};
