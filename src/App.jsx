import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import MenuModal from './components/MenuModal';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/productSlice';

function App() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  // Load & Save Local Storage (ย้ายมาจาก Modal)
  useEffect(() => {
    const savedCart = localStorage.getItem("coffee_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("coffee_cart", JSON.stringify(cart));
  }, [cart]);

  // คำนวณจำนวนชิ้นทั้งหมดเพื่อส่งให้ Navbar
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const fullMenuData = {
    Coffee: [
      { id: 101, name: "Espresso", price: "60.-" },
      { id: 102, name: "Americano", price: "70.-" },
      { id: 103, name: "Latte", price: "80.-" },
    ],
    Dessert: [{ id: 201, name: "Croissant", price: "95.-" }],
    Food: [{ id: 301, name: "Club Sandwich", price: "150.-" }]
  };

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      {/* ส่ง totalItems ไปแสดงเลขที่ Navbar */}
      <Navbar onOpenCart={() => setIsModalOpen(true)} totalItems={totalItems}/>
      <Hero />
      <MenuSection cart={cart} setCart={setCart} fullMenuData={fullMenuData}/>
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fullMenuData={fullMenuData}
        cart={cart}
        setCart={setCart}
      />
    </div>
  );
}

export default App;