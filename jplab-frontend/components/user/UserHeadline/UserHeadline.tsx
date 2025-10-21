
type HeadLineProps = {
  preText: string;
  mainText: string;
  subText: string;
};

export default function UserHeadline({ preText, mainText, subText }:HeadLineProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg primary-text-color">{preText}</p>
      <h1 className="text-lg sm:text-2xl font-semibold">{mainText}</h1>
      <p className="text-gray-500">{subText}</p>
    </div>
  );
}