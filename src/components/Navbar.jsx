import { Coffee, ShoppingBag, LogOut } from 'lucide-react';

export default function Navbar({ onOpenCart, totalItems, userRole, username, onLogout }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="bg-orange-800 p-2.5 rounded-2xl shadow-lg shadow-orange-900/20 group-hover:rotate-12 transition-transform duration-300">
            <Coffee className="text-white" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-2xl leading-none text-orange-950 tracking-tighter">SUNSET</span>
            <span className="text-[10px] font-bold text-orange-800 uppercase tracking-[0.3em] leading-none ml-0.5">Cafe</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.15em] text-orange-950/50">
          {userRole === 'customer' ? (
            <>
              <a href="#" className="text-orange-900 border-b-2 border-orange-800 pb-1 px-1">Menu</a>
              <a href="#" className="hover:text-orange-900 transition-colors">Our Story</a>
              <a href="#" className="hover:text-orange-900 transition-colors">Find Us</a>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full ring-1 ring-orange-200">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                <span>Staff: <span className="font-black">{username || 'Admin'}</span></span>
              </div>
            </>
          )}
        </div>

        {/* Actions Area */}
        <div className="flex items-center gap-5">
          {userRole === 'customer' && (
            <button
              onClick={onOpenCart}
              className="group relative bg-orange-50 text-orange-950 p-3 rounded-2xl hover:bg-orange-800 hover:text-white transition-all active:scale-95 border border-orange-100"
            >
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-700 text-white text-[10px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          )}

          <div className="h-8 w-[1px] bg-orange-100 hidden sm:block" />

          <button
            onClick={onLogout}
            className="flex items-center gap-2.5 bg-white text-orange-950 px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-700 transition-all border border-orange-100 hover:border-red-100 group shadow-sm active:scale-95"
          >
            <LogOut size={16} className="text-orange-900/40 group-hover:text-red-600 group-hover:-translate-x-0.5 transition-all" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
