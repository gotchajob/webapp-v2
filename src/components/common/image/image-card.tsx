import Image from "next/image";
export const ImageCard = ({
  src,
  id,
  objectFit = "cover",
  width = "100%",
  height = "auto",
  borderRadius,
}: {
  objectFit?: any;
  height?: string | number;
  src: string;
  borderRadius?: number;
  id?: string;
  width?: string | number;
}) => {
  return (
    <Image
      src={src}
      alt="none"
      width={1920}
      height={1080}
      style={{
        width,
        objectFit,
        borderRadius,
        objectPosition: "center",
        borderTopLeftRadius: borderRadius ? "" : "inherit",
        borderTopRightRadius: borderRadius ? "" : "inherit",
        height,
      }}
      id={id}
    />
  );
};
