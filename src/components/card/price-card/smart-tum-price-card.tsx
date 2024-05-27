"use client";

import { FlexBox } from "components/common/box/flex-box";
import { Text } from "components/common/text/text";
import { PriceCard } from "./price-card";

export const SmartTUMPriceCard = () => {
  return (
    <PriceCard title="Smart Tum" desVisible={false} disable={true}>
      <FlexBox alignItems={"baseline"}>
        <Text fontSize={25} color={"white"} fontWeight={700}>
          Miễn phí
        </Text>
      </FlexBox>
    </PriceCard>
  );
};
