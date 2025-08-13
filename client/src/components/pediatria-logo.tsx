export function PediatriaLogo() {
  return (
    <div className="w-30 h-30 mx-auto mb-4 relative">
      {/* Main container circle */}
      <div className="w-30 h-30 bg-white rounded-full flex items-center justify-center shadow-lg relative">
        {/* Border ring */}
        <div className="absolute inset-2 border-2 border-gray-800 rounded-full"></div>
        
        {/* Top text - PEDIATRIA */}
        <div className="absolute top-4 text-xs font-bold text-gray-800 tracking-wider">
          PEDIATRIA
        </div>
        
        {/* Bottom text - HRT - DF */}
        <div className="absolute bottom-4 text-xs font-bold text-gray-800 tracking-wide">
          HRT - DF
        </div>
        
        {/* Year - 1976 */}
        <div className="absolute bottom-9 text-sm font-bold text-gray-800">
          1976
        </div>
        
        {/* Star */}
        <div className="absolute top-11 right-6 text-yellow-500 text-sm">
          ★
        </div>
        
        {/* Stick figures */}
        <div className="flex items-center justify-center gap-1 mt-2">
          {/* Green figure */}
          <div className="relative">
            <div className="w-3 h-5 bg-green-500 rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          
          {/* Blue figure */}
          <div className="relative">
            <div className="w-3 h-5 bg-blue-500 rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
          </div>
          
          {/* Yellow figure (smaller) */}
          <div className="relative">
            <div className="w-2.5 h-4 bg-yellow-500 rounded-full"></div>
            <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
          </div>
          
          {/* Pink figure */}
          <div className="relative">
            <div className="w-3 h-5 bg-pink-500 rounded-full"></div>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
