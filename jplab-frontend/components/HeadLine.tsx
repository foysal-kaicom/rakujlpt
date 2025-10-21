import Image from "next/image";
type HeadLineProps = {
  preText: string;
  mainText: string;
  subText: string;
};

export default function HeadLine({ preText, mainText, subText }:HeadLineProps) {
  return (
    <div className="flex flex-col gap-3 sm:justify-center sm:items-center">
      <p className="text-sm sm:text-base primary-text-color">{preText}</p>
      <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold">{mainText}</h1>
      <Image
        src="/assets/img/overlay-14.png"
        width={512}
        height={512}
        alt=""
        className="size-14 -rotate-135 -my-6"
      />
      <p className="text-gray-500 text-sm sm:text-base">{subText}</p>
    </div>
  );
}
