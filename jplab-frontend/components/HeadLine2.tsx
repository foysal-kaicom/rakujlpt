type HeadLineProps = {
  preText: string;
  mainText: string;
  subText: string;
};

export default function HeadLine2({ preText, mainText, subText }:HeadLineProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm sm:text-base primary-text-color">{preText}</p>
      <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold">{mainText}</h1>
      <p className="text-gray-500 text-sm sm:text-base">{subText}</p>
    </div>
  );
}
