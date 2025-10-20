import { AiOutlineLoading } from "react-icons/ai";

export default function SuspenseLoader() {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000062] bg-opacity-60 px-[5%]">
        <div className="size-20 rounded-2xl shadow bg-white flex items-center justify-center">
          <AiOutlineLoading className="size-8 animate-spin text-blue-700" />
        </div>
      </div>
    </>
  );
}
