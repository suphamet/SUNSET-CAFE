import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, IceCream, Pizza, ShoppingBag, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectGroupedProducts } from "../../redux/productSlice";

export default function MenuModal({ isOpen, onClose, fullMenuData, cart, setCart }) {
  const [activeTab, setActiveTab] = useState("Coffee");

  // Update activeTab when fullMenuData changes if current activeTab is empty
  useEffect(() => {
    const categories = Object.keys(fullMenuData);
    if (categories.length > 0 && !fullMenuData[activeTab]) {
      setActiveTab(categories[0]);
    }
  }, [fullMenuData, activeTab]);

  useEffect(() => {
    const savedCart = localStorage.getItem("coffee_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart data", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("coffee_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    if (window.confirm("Do you want to complete your order?")) {
      setCart([]);
      localStorage.removeItem("coffee_cart");
      onClose();
      alert("Order placed successfully! ☕");
    }
  };

  // 1. คำนวณราคาทั้งหมด
  const totalPrice = cart.reduce((sum, item) => {
    // Handle both number and string price inputs safely
    const priceStr = String(item.price);
    const price = parseInt(priceStr.replace(/[^0-9]/g, "")) || 0;
    return sum + price * item.quantity;
  }, 0);

  // 2. คำนวณจำนวนชิ้นทั้งหมด (แก้ไขตรงนี้)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="relative bg-[#faf7f2] w-full max-w-6xl h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* 1. Sidebar */}
            <div className="w-full md:w-64 bg-orange-50/50 p-6 border-r border-orange-100 flex flex-col gap-2">
              <h4 className="text-xl font-serif font-bold text-orange-950 mb-4">Menu</h4>
              {Object.keys(fullMenuData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === cat
                    ? "bg-orange-800 text-white shadow-lg translate-x-1"
                    : "text-orange-900/50 hover:bg-orange-100"
                    }`}
                >
                  {cat === "Coffee" && <Coffee size={18} />}
                  {cat === "Dessert" && <IceCream size={18} />}
                  {cat === "Food" && <Pizza size={18} />}
                  {cat}
                </button>
              ))}
            </div>

            {/* 2. Content */}
            <div className="flex-1 p-8 overflow-y-auto bg-white/30 border-r border-orange-100">
              <h5 className="text-2xl font-serif font-bold text-orange-900 mb-6 tracking-tight">
                {activeTab} Selection
              </h5>
              <div className="grid gap-3">
                {fullMenuData[activeTab] && fullMenuData[activeTab].length > 0 ? (
                  fullMenuData[activeTab].map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-5 rounded-2xl bg-white/50 hover:bg-white transition-all shadow-sm border border-transparent hover:border-orange-100 group"
                    >
                      <div>
                        <p className="font-bold text-gray-800 group-hover:text-orange-800 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-sm text-orange-900/60 font-medium">{item.price}</p>
                      </div>
                      <button
                        onClick={() => addToCart(item)}
                        className="w-10 h-10 rounded-full bg-orange-800 text-white flex items-center justify-center hover:bg-orange-900 transition-transform active:scale-90 shadow-md"
                      >
                        +
                      </button>
                    </div>
                  ))) : (
                  <div className="text-center py-10 text-gray-400">No items in this category</div>
                )}
              </div>
            </div>

            {/* 3. Cart (ส่วนที่แก้ไข) */}
            <div className="w-full md:w-85 bg-white p-6 flex flex-col border-l border-orange-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-orange-900">
                  <ShoppingBag size={20} />
                  <h4 className="font-bold text-lg tracking-tight">Your Order</h4>
                </div>
              </div>
              <div className="mb-4">
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full">
                  {totalItems} {totalItems <= 1 ? "item" : "items"} {/* ใช้ totalItems แทน */}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="text-4xl mb-4 opacity-20">☕</div>
                    <p className="text-gray-400 italic text-sm">Your tray is empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-orange-50/40 p-4 rounded-2xl border border-orange-50/50 relative group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <p className="font-bold text-sm text-gray-800 flex-1 pr-4 leading-tight">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-orange-900">{item.price}</span>

                        <div className="flex items-center bg-white rounded-full border border-orange-200 p-1 shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-orange-100 text-orange-800 transition-colors font-bold"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-gray-700">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-orange-100 text-orange-800 transition-colors font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-6 border-t-2 border-dashed border-orange-100">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-gray-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-orange-900">
                    ฿{totalPrice.toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={clearCart}
                  disabled={cart.length === 0}
                  className="w-full bg-orange-800 text-white py-4 rounded-2xl font-bold hover:bg-orange-900 transition-all disabled:bg-gray-200 disabled:cursor-not-allowed shadow-xl shadow-orange-900/10 active:scale-[0.98]"
                >
                  Checkout Now
                </button>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-orange-50 rounded-full text-orange-900 hover:bg-orange-200 transition-colors"
            >
              <X size={20} />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}