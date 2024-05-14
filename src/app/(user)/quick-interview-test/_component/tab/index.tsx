
import { QuestionTypeList } from "package/api/question-type";
import { QuickInterviewTabs } from "./tab";

export const Tabs = async () => {
  const questionTypeList = await QuestionTypeList();
  return (
    <QuickInterviewTabs questionTypeList={questionTypeList.data} />
  )
};
