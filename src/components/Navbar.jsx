import { Coffee, ShoppingBag } from 'lucide-react';

// 1. รับ totalItems เพิ่มเข้ามาจาก Props
export default function Navbar({ onOpenCart, totalItems }) { 
  return (
    <nav className="flex justify-between items-center px-8 py-6 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-2xl">
        <Coffee className="text-orange-700" />
        <span className="tracking-tight text-orange-900">SUNSET CAFE</span>
      </div>
      <div className="hidden md:flex gap-8 font-medium">
        <a href="#" className="hover:text-orange-700 transition">Home</a>
        <a href="#" className="hover:text-orange-700 transition">Menu</a>
        <a href="#" className="hover:text-orange-700 transition">Contact</a>
      </div>
      
      <button 
        onClick={onOpenCart}
        className="relative bg-orange-800 text-white p-2.5 rounded-full hover:bg-orange-900 transition active:scale-90"
      >
        <ShoppingBag size={20} />

        {/* 2. เพิ่มโค้ดส่วน Badge ตัวเลขตรงนี้ */}
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  );
}