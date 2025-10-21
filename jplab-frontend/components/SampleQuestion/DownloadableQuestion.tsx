import { FaFilePdf, FaHeadphones, FaDownload, FaPlay } from "react-icons/fa";

interface DownloadableQuestionProps {
  pdfFiles: Array<{ file: string; title: string }>;
  audioFiles: Array<{ file: string; title: string }>;
}

export default function DownloadableQuestion({
  pdfFiles,
  audioFiles,
}: DownloadableQuestionProps) {
  return (
    <div className="bg-white space-y-12">
      {/* AUDIO FILES */}
      <section>
        <div className="text-lg md:text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <FaHeadphones className="text-blue-500" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <h1>Audio Files</h1>
            <p className="text-sm text-red-600">(Listen Only)</p>
          </div>
        </div>
        {audioFiles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {audioFiles.map((audio, idx) => (
              <div
                key={idx}
                className="border border-blue-200 rounded-md p-2 flex flex-col gap-3"
                onContextMenu={(e) => e.preventDefault()}
              >
                <div className="flex items-center gap-3 text-blue-800">
                  <FaPlay className="text-sm" />
                  <p className="font-medium ">{audio.title}</p>
                </div>
                <audio
                  controls
                  controlsList="nodownload noplaybackrate"
                  className="w-full rounded-lg drop-shadow-sm h-5"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <source src={audio.file} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
            No Audio files uploaded
          </p>
        )}
      </section>

      {/* PDF FILES */}
      <section>
        <div className="text-lg md:text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
          <FaFilePdf className="text-blue-500" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <h1> PDF Files</h1>
            <p className="text-sm text-red-600">(Downloadable)</p>
          </div>
        </div>
        {pdfFiles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-3">
            {pdfFiles.map((pdf, idx) => (
              <div
                key={idx}
                className="border border-blue-200 rounded-md p-2 flex justify-between items-center shadow-sm"
              >
                <div className="flex items-center gap-3 text-sm">
                  <FaFilePdf className="text-blue-600 " />
                  <p className="font-medium text-blue-600">{pdf.title}</p>
                </div>
                <a
                  href={pdf.file}
                  download
                  target="_blank"
                  className="flex items-center gap-2 text-xs sm:text-sm text-white bg-sky-600 hover:bg-sky-700 px-3 py-1 rounded-md font-semibold transition-all"
                >
                  <FaDownload className="text-white text-xs" />
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
            No PDF files uploaded
          </p>
        )}
      </section>
    </div>
  );
}
