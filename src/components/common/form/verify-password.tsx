"use client";
import { Text } from "components/common/text/text";

export const VerifyPassword = ({
  input,
}: {
  input: string;
}) => {
  return (
    <Text fontSize={12} fontWeight={300} pl={1}>
      Mật khẩu bao gồm:
      <br />
      Tối thiểu <span style={{ color: "#69b1da" }}>8 kí tự</span>
      <br />
      Ít nhất <span style={{ color: "#69b1da" }}>1 kí tự viết hoa (A-Z)</span>
      <br />
      Ít nhất <span style={{ color: "#69b1da" }}>1 chữ số (0-9)</span>
    </Text>
  );
};
