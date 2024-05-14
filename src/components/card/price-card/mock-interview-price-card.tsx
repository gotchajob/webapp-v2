"use client";


import { FlexBox } from "components/common/box/flex-box";
import { Text } from "components/common/text/text";
import { useState } from "react";
import { PriceCard } from "./price-card";
import { PricePopup } from "components/common/popup/price-popup";
import { UserCurrentResponse } from "package/api/user/current";

export const MockInterviewPriceCard = ({ user }: { user?: UserCurrentResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PriceCard
        title="Mock Interview"
        description="90 phút"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FlexBox alignItems={"baseline"}>
          <Text fontSize={25} color={"white"} fontWeight={700}>
            375
          </Text>
          <Text fontSize={15} color={"white"} fontWeight={700}>
            .000 VND
          </Text>
        </FlexBox>
      </PriceCard>
      <PricePopup isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
    </>
  );
};
