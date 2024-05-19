"use client";

import { Text } from "components/common/text/text";
import { PriceCard } from "./price-card";
import { FlexBox } from "components/common/box/flex-box";

export const CVPriceCard = () => {
  return (
    <PriceCard title="CV" description="1 CV" disable={true}>
      <FlexBox alignItems={"baseline"}>
        <Text fontSize={25} color={"white"} fontWeight={700}>
          200
        </Text>
        <Text fontSize={15} color={"white"} fontWeight={700}>
          .000 VND
        </Text>
      </FlexBox>
    </PriceCard>
  );
};
