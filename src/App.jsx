import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/main/Hero';
import MenuSection from './components/main/MenuSection';
import MenuModal from './components/main/MenuModal';
import StaffDashboard from './components/dashboard/StaffDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { useSelector } from 'react-redux';
import { selectGroupedProducts } from '../redux/productSlice';

function App() {
  const fullMenuData = useSelector(selectGroupedProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [userRole, setUserRole] = useState(null); // null | 'customer' | 'employee'
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Load persistence
  useEffect(() => {
    const savedRole = localStorage.getItem("user_role");
    const savedUsername = localStorage.getItem("user_name");
    if (savedRole) setUserRole(savedRole);
    if (savedUsername) setUsername(savedUsername);

    const savedCart = localStorage.getItem("coffee_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Cart load error", e);
      }
    }
  }, []);

  // Save Cart
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("coffee_cart", JSON.stringify(cart));
    }
  }, [cart]);

  const handleLogin = (role, name) => {
    setUserRole(role);
    if (name) {
      setUsername(name);
      localStorage.setItem("user_name", name);
    }
    localStorage.setItem("user_role", role);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUsername('');
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_name");
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If not logged in or role not selected, show entry gate only
  if (!userRole) {
    if (isRegistering) {
      return <Register onBackToLogin={() => setIsRegistering(false)} />;
    }
    return (
      <Login
        onLogin={(role, name) => handleLogin(role, name)}
        onEnterAsCustomer={() => handleLogin('customer')}
        onGoToRegister={() => setIsRegistering(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <Navbar
        onOpenCart={() => setIsModalOpen(true)}
        totalItems={totalItems}
        userRole={userRole}
        username={username}
        onLogout={handleLogout}
      />

      <main>
        {userRole === 'customer' ? (
          <>
            <Hero />
            <MenuSection cart={cart} setCart={setCart} onOpenModal={() => setIsModalOpen(true)} />
          </>
        ) : (
          <StaffDashboard />
        )}
      </main>

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
