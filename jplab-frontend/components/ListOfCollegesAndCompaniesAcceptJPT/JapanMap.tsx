interface JapanMapProps {
  selectedPrefecture: string;
  setSelectedPrefecture: (prefecture: string) => void;
}


export default function JapanMap({setSelectedPrefecture , selectedPrefecture}:JapanMapProps) {
  return (
    <>
      <div className="hidden lg:block space-y-8 bg-sky-50 p-10 rounded-2xl">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            List of Prefectures
          </h1>
          <p className="text-sm sm:text-base">
            Please click on the area you are looking for.
          </p>
        </div>
        <div className="p-5 bg-teal-50 w-[665px] shadow-lg drop-shadow-md rounded-md mx-auto">
          <div className="text-sm grid grid-cols-3 gap-y-1 gap-x-2">
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-sky-200"></p>
              <p>Hokkaido</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-blue-200"></p>
              <p>Tohuko region</p>
            </div>

            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-cyan-200"></p>
              <p>Kanto region</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-green-200"></p>
              <p>Chubu region</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-purple-200"></p>
              <p>Tokyo</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-lime-200"></p>
              <p>Kansai region</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-orange-200"></p>
              <p>Chugoku / Shikoku region</p>
            </div>
            <div className="flex gap-1 items-center">
              <p className="size-4 rounded bg-yellow-200"></p>
              <p>Kyushu / Okinawa region</p>
            </div>
          </div>
          <div className="text-[10px] text-center grid grid-cols-5 gap-1 ">
            <div className="space-y-1 mt-15">
              <p className="w-30 h-20 rounded flex justify-center items-center p-2 "></p>
              <div className="grid grid-cols-2 justify-end w-30 gap-1">
                <p className="col-span-2 rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>

                <p onClick={() => setSelectedPrefecture("Yamaguchi")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Yamaguchi' ? 'bg-orange-300' : 'bg-orange-200'}`}>
                  Yamaguchi
                </p>
                <p onClick={() => setSelectedPrefecture("Saga")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Saga' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Saga
                </p>
                <p onClick={() => setSelectedPrefecture("Fukuda")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Fukuda' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Fukuda
                </p>
                <p onClick={() => setSelectedPrefecture("Nagasaki")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Nagasaki' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Nagasaki
                </p>
                <p onClick={() => setSelectedPrefecture("Oita")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Oita' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Oita
                </p>
                <p onClick={() => setSelectedPrefecture("Kumamoto")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kumamoto' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Kumamoto
                </p>
                <p onClick={() => setSelectedPrefecture("Miyazaki")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Miyazaki' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Miyazaki
                </p>
                <p onClick={() => setSelectedPrefecture("Okinawa")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Okinawa' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Okinawa
                </p>
                <p onClick={() => setSelectedPrefecture("Kagoshima")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kagoshima' ? 'bg-yellow-300' : 'bg-yellow-200'}`}>
                  Kagoshima
                </p>
              </div>
            </div>

            <div className="spacey-1 mt-16">
              <p className="w-30 h-20 rounded flex justify-center items-center p-2 "></p>
              <div className="grid grid-cols-2 justify-end w-30 gap-1">
                <p className="col-span-2 rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2"></p>

                <p onClick={() => setSelectedPrefecture("Shimane")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Shimane' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Shimane
                </p>
                <p onClick={() => setSelectedPrefecture("Tottori")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Tottori' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Tottori
                </p>
                <p onClick={() => setSelectedPrefecture("Hiroshima")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Hiroshima' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Hiroshima
                </p>
                <p onClick={() => setSelectedPrefecture("Okayama")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Okayama' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Okayama
                </p>
                <p onClick={() => setSelectedPrefecture("Ehime")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Ehime' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Ehime
                </p>
                <p onClick={() => setSelectedPrefecture("Kagawa")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kagawa' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Kagawa
                </p>
                <p onClick={() => setSelectedPrefecture("Kochi")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kochi' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  kochi
                </p>
                <p onClick={() => setSelectedPrefecture("Tokushima")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Tokushima' ? 'bg-orange-300' :'bg-orange-200'}`}>
                  Tokusima
                </p>
              </div>
            </div>

            <div className="space-y-1 mt-15">
              <p className="w-30 h-20 rounded flex justify-center items-center p-2 "></p>
              <div className="grid grid-cols-2 justify-end w-30 gap-1">
                <p className="col-span-2 rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2 "></p>
                <p className="rounded flex justify-center items-center p-2"></p>

                <p onClick={() => setSelectedPrefecture("Hyogo")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Hyogo' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Hyoga
                </p>
                <p onClick={() => setSelectedPrefecture("Shiga")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Shiga' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Shiga
                </p>
                <p onClick={() => setSelectedPrefecture("Osaka")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Osaka' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Osaka
                </p>
                <p onClick={() => setSelectedPrefecture("Kyoto")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kyoto' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Kyoto
                </p>
                <p onClick={() => setSelectedPrefecture("Wakayama")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Wakayama' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Wakayama
                </p>
                <p onClick={() => setSelectedPrefecture("Nara")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Nara' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Nara
                </p>

                <p className="rounded flex justify-center items-center p-2"></p>

                <p onClick={() => setSelectedPrefecture("Mie")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Mie' ? 'bg-lime-300' : 'bg-lime-200'}`}>
                  Mie
                </p>
              </div>
            </div>

            <div className="space-y-1 mt-11">
              <p className="w-30 h-20 rounded flex justify-center items-center p-2"></p>
              <div className="grid grid-cols-2 justify-end w-30 gap-1">
                <p className="col-span-2 rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>
                <p className="rounded flex justify-center items-center p-2"></p>

                <p onClick={() => setSelectedPrefecture("Ishikawa")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Ishikawa' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Ishikawa
                </p>
                <p onClick={() => setSelectedPrefecture("Fukui")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Fukui' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Fukui
                </p>
                <p onClick={() => setSelectedPrefecture("Toyama")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Toyama' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Toyama
                </p>
                <p onClick={() => setSelectedPrefecture("Gifu")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Gifu' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Gifu
                </p>
                <p onClick={() => setSelectedPrefecture("Nagano")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Nagano' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Nagano
                </p>
                <p onClick={() => setSelectedPrefecture("Shizuoka")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Shizuoka' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Shizuoka
                </p>
                <p onClick={() => setSelectedPrefecture("Tamanashi")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Tamanashi' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Tamanashi
                </p>
                <p onClick={() => setSelectedPrefecture("Aichi")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Aichi' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Aichi
                </p>
                <p onClick={() => setSelectedPrefecture("Tokyo")} className={` rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Tokyo' ? 'bg-purple-300' : 'bg-purple-200'}`}>
                  Yokyo
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p  onClick={() => setSelectedPrefecture("Hokkaido")} className={`w-30 h-20 rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Hokkaido' ? 'bg-sky-300' : 'bg-sky-200'}`}>
                Hokkaido
              </p>
              <div className="grid grid-cols-2 justify-end w-30 gap-1">
                <p onClick={() => setSelectedPrefecture("Aomori")} className={`col-span-2 bg-blue-200 rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Aomori' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Aomori
                </p>
                <p onClick={() => setSelectedPrefecture("Akita")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Akita' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Akita
                </p>
                <p onClick={() => setSelectedPrefecture("Iwate")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Iwate' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Iwate
                </p>
                <p onClick={() => setSelectedPrefecture("Yamagata")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Yamagata' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Yamagata
                </p>
                <p onClick={() => setSelectedPrefecture("Miyagi")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Miyagi' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Miyagi
                </p>

                <p className=""></p>

                <p onClick={() => setSelectedPrefecture("Fukushima")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Fukushima' ? 'bg-blue-300' : 'bg-blue-200'}`}>
                  Fukushima
                </p>

                <p onClick={() => setSelectedPrefecture("Niigata")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Niigata' ? 'bg-green-300' : 'bg-green-200'}`}>
                  Niigata
                </p>

                <p></p>

                <p onClick={() => setSelectedPrefecture("Gunma")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Gunma' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Gunma
                </p>
                <p onClick={() => setSelectedPrefecture("Tochigi")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Tochigi' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Tochigi
                </p>
                <p onClick={() => setSelectedPrefecture("Saitama")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Saitama' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Saitama
                </p>
                <p onClick={() => setSelectedPrefecture("Ibaraki")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Ibaraki' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Ibaraki
                </p>
                <p onClick={() => setSelectedPrefecture("Kanagawa")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Kanagawa' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Kanagawa
                </p>
                <p onClick={() => setSelectedPrefecture("Chiba")} className={`rounded flex justify-center items-center p-2 cursor-pointer ${selectedPrefecture == 'Chiba' ? 'bg-cyan-400' : 'bg-cyan-200'}`}>
                  Chiba
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
