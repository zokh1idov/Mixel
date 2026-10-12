function CardSkeleton() {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white animate-pulse ">
      <div className="flex flex-col items-center px-4 pt-6">
        {/* rasm */}
        <div className="w-[130px] h-[140px] bg-gray-300 rounded"></div>

        {/* narx */}
        <div className="w-[140px] h-[20px] bg-gray-300 rounded mt-12"></div>

        {/* nomi (2 qator) */}
        <div className="w-[160px] h-[16px] bg-gray-300 rounded mt-6"></div>
        <div className="w-[100px] h-[16px] bg-gray-300 rounded mt-2 mb-4"></div>
      </div>

      {/* pastdagi 3 ta tugma */}
      <div className="flex border-t border-gray-300 h-[70px]">
        <div className="flex-1 border-r border-gray-300"></div>
        <div className="flex-1 border-r border-gray-300"></div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
}

export default CardSkeleton;