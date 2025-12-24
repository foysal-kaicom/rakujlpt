export default function OurTeamSkeleton () {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="group relative bg-white rounded-3xl p-6 duration-300 border border-blue-100 animate-pulse"
                >
                  {/* Avatar */}
                  <div className="relative w-32 h-32 mx-auto rounded-full size-32 animate-pulse bg-purple-50">
                    
                  </div>
                  <p className=" bg-violet-50 text-white px-3 py-1 rounded-full text-xs font-medium mt-3 mb-4 w-40 mx-auto h-6 animate-pulse">
                    
                  </p>
        
                  {/* Name & Role */}
                  <h3 className="text-xl font-bold bg-gray-50 h-5 w-full rounded animate-pulse"></h3>
                  <p className="bg-gray-50 text-sm mt-2 h-5 w-full rounded animate-pulse"></p>
        
                  {/* Social Icons */}
                  <div className="flex justify-center gap-4 mt-5">
                    {[1,2,3].map((i)=>(
                        <p key={i} className="bg-linear-to-r from-indigo-100 to-purple-100 text-white rounded-full size-8 drop-shadow-sm drop-shadow-violet-300 border-b border-white/50 animate-pulse"></p>
                    ))}
                   
                  </div>
                </div>
              ))}
            </div>
    )
}