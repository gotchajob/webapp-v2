
import { getUserToken } from "package/cookies/token";
import { HandleAnswer } from "./answer-form";
import { cookies } from "next/headers";
import { QuestionList } from "package/api/question";

export const Answer = async ({ questionId }: { questionId: string }) => {
  const accessToken = getUserToken(cookies());
  const questionList = await QuestionList(
    {
      questionId,
    },
    accessToken
  );
  return <HandleAnswer questionList={questionList.data} />;
};
