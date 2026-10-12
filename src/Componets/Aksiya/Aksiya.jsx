    
function Recommended() {
  return (
    <>
      <div className="Recommended">
        <div className="container_1200">
          <div className="flex gap-5 mt-6">
            <div className="w-[360px] h-[720px] shrink-0 flex flex-col">
              <div className="h-[140px] bg-[#d93a35]"></div>

              <div className="h-[290px] bg-white flex flex-col items-center justify-center">
                <span className="text-[120px] font-bold leading-none text-[#d93a35]">
                  %
                </span>
                <span className="text-[30px] font-bold tracking-wide text-[#d93a35]">
                  ЛИКВИДАЦИЯ
                </span>
              </div>

              <div className="h-[290px] bg-[#d93a35] flex items-center justify-center gap-3 text-white">
                <span className="text-[44px] font-light">до</span>
                <span className="text-[84px] font-bold leading-none">45%</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-5 flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recommended;