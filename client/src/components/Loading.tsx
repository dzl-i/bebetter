import Image from "next/image";

export default function Loading({
  width,
  height,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src="/loading.svg"
      alt="Loading"
      width={width ? width : 64}
      height={height ? height : 64}
    />
  );
}
