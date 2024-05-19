import { ImageCard } from "components/common/image/image-card";

export const MockInterviewIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/mock-interview-icon.png"
    />
  );
};

export const PartnerTrainingIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/partner-training-icon.png"
    />
  );
};
export const CVIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/cv-icon.png"
    />
  );
};

export const SmartTumIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/smart-tum-icon.png"
    />
  );
};

export const UserIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/user.png"
    />
  );
};
export const CartIcon = ({ width }: { width?: number | string }) => {
  return (
    <ImageCard
      width={width}
      objectFit={"contain"}
      src="/assets/icon/cart.png"
    />
  );
};
