"use client";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { FlexBox, FlexCenter } from "components/common/box/flex-box";
import { ContainedButton } from "components/common/button/button";
import { StyledCard } from "components/common/card/card";
import { PRIMARYCOLOR } from "components/common/config";
import { MainTitle, Text } from "components/common/text/text";
import { useRouter } from "next/navigation";
import { QuestionType } from "package/api/question-type";
import { SetStateAction, useState } from "react";


export const QuickInterviewTabs = ({
  questionTypeList,
}: {
  questionTypeList: QuestionType[];
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const listTabs = [
    {
      title: "InformationTabs",
      component: (
        <InformationTab
          onClick={() => {
            setTabIndex(1);
          }}
        />
      ),
    },
    {
      title: "SelectQuestion",
      component: <SelectQuestionTabs questionTypeList={questionTypeList} />,
    },
  ];
  return <>{listTabs[tabIndex].component}</>;
};

export const InformationTab = ({
  onClick,
}: {
  onClick: SetStateAction<any>;
}) => {
  return (
    <Box maxWidth={500}>
      <Text textAlign={"center"} py={1}>
        Chào mừng bạn đến với dịch vụ
      </Text>
      <MainTitle>Quick interview test</MainTitle>
      <Text textAlign={"center"} py={4} fontWeight={300} fontSize={12}>
        Đây là dịch vụ mô phỏng trả lời phỏng vấn, Gotcha Job sẽ giúp bạn nắm
        được phần nào những dạngcâu hỏi thường gặp khi tham gia phỏng vấn.
      </Text>
      <StyledCard py={2} pb={4} px={2}>
        <Text
          textAlign={"center"}
          fontWeight={700}
          fontSize={18}
          pb={2}
          color={PRIMARYCOLOR}
        >
          Quy định:
        </Text>
        <Text color="#04273B" fontSize={12.5} fontWeight={300}>
          1. Chọn dạng câu hỏi bạn muốn: câu hỏi chuyên môn và câu hỏi tình
          huống.
          <br />
          2. Gotcha Job sẽ cho bạn 5 câu hỏi lần lượt, sau khi đọc câu hỏi, bấm
          nút “bắt đầu trả lời”, bạn có 3 phút để ghi câu trả lời của mình vào
          khung.
          <br />
          3. Hết 3 phút, hệ thống sẽ tự động chuyển qua câu tiếp theo. Bạn có
          quyền bấm skip nếu trả lời xong trước thời gian quy định.
          <br />
        </Text>
      </StyledCard>
      <FlexCenter pt={5} onClick={onClick}>
        <ContainedButton>Tiếp tục</ContainedButton>
      </FlexCenter>
    </Box>
  );
};

export const SelectQuestionTabs = ({
  questionTypeList,
}: {
  questionTypeList: QuestionType[];
}) => {
  const router = useRouter();
  const [select, setSelect] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelect(Number.parseInt((event.target as HTMLInputElement).value))
  };

  return (
    <Box maxWidth={500}>
      <Text textAlign={"center"} py={1}>
        Chào mừng bạn đến với dịch vụ
      </Text>
      <MainTitle>Quick interview test</MainTitle>
      <Text textAlign={"center"} py={4} fontWeight={300} fontSize={12}>
        Đây là dịch vụ mô phỏng trả lời phỏng vấn, Gotcha Job sẽ giúp bạn nắm
        được phần nào những dạngcâu hỏi thường gặp khi tham gia phỏng vấn.
      </Text>

      <RadioGroup
        defaultValue={0}
        name="radio-buttons-group"
        onChange={handleChange}
      >
        <Stack spacing={2} width={250}>
          {questionTypeList.map((questionType) => (
            <FlexBox
              key={questionType.id}
              borderRadius={2}
              sx={{
                boxShadow: "0px 0px 20px rgba(8.40, 78, 117.60, 0.20)",
                alignItems: "center",
              }}
            >
              <Radio
                value={questionType.id}
                size="small"
                sx={{
                  color: "#0E82C4",
                  m: 1.5,
                }}
              />
              <Text color={"#0E82C4"} fontSize={14}>
                {questionType.name}
              </Text>
            </FlexBox>
          ))}
        </Stack>
      </RadioGroup>
      <FlexCenter pt={5}>
        <ContainedButton
          disabled={select === 0}
          onClick={() => {
            router.push("/quick-interview-test/" + select);
          }}
        >
          Bắt đầu
        </ContainedButton>
      </FlexCenter>
    </Box>
  );
};
