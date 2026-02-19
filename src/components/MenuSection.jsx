import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import MenuModal from "./MenuModal";
import { fetchProducts, selectGroupedProducts } from "../../redux/productSlice";

// รับ Props มาจาก App.jsx
export default function MenuSection({ cart, setCart, onOpenModal }) {
    const dispatch = useDispatch();
    const { items: menus, status, error } = useSelector((state) => state.product);
    const fullMenuData = useSelector((state) => selectGroupedProducts(state));
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log("menus", menus)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div className="text-center py-20 text-orange-800 font-bold">Loading Menu...</div>;
    if (status === 'failed') return <div className="text-center py-20 text-red-600 font-bold">Error: {error}</div>;

    return (
        <section className="max-w-6xl mx-auto px-8 py-20 border-t border-orange-200">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-serif font-bold text-orange-950 mb-4">Our Signature Menu</h2>
                <div className="w-20 h-1 bg-orange-800 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.isArray(menus) && menus.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-2xl transition-all group"
                    >
                        <div className="overflow-hidden rounded-2xl h-48 mb-4">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold text-orange-900">฿{item.price}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-12 bg-orange-800 text-white px-8 py-4 rounded-full font-bold hover:bg-orange-900 transition-all block mx-auto shadow-lg"
            >
                View Full Menu
            </button>

            {/* ส่ง Props ทั้งหมดที่จำเป็นไปให้ MenuModal */}
            <MenuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fullMenuData={fullMenuData}
                cart={cart}
                setCart={setCart}
            />
        </section>
    );
}