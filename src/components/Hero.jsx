import { motion } from "framer-motion";
import { Coffee, Award, Leaf } from "lucide-react"; // ติดตั้ง lucide-react ด้วยนะครับ
import coffee1 from "../assets/Coffee/Coffee.jpg";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Blob - เพิ่มลูกเล่นพื้นหลัง */}
            <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-orange-100/50 rounded-l-full blur-3xl" />

            <main className="max-w-6xl mx-auto px-8 pt-16 pb-24 flex flex-col md:flex-row items-center gap-16">
                
                {/* 1. Text Content */}
                <div className="flex-1 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-5xl md:text-6xl font-serif font-bold leading-[1.1] text-[#2d1e12]">
                            Start Your Day With <br />
                            <span className="text-orange-800 relative">
                                Freshly Brewed
                                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none text-orange-200"><path d="M2 5.5C40 2 110 2 198 5.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
                            </span> 
                            {" "}Coffee
                        </h3>
                    </motion.div>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                        Selection of premium coffee beans from the best origins. 
                        Carefully roasted for a perfect taste in every cup. 
                        Experience the world of coffee awaits in our shop.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-orange-800 text-white px-10 py-4 rounded-full font-bold hover:bg-orange-900 shadow-xl shadow-orange-900/20 transition-all active:scale-95">
                            Order Now!
                        </button>
                    </div>

                    {/* 2. Mini Features - เพิ่มความน่าเชื่อถือ */}
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-orange-200">
                        <div className="flex items-center gap-2">
                            <Coffee size={20} className="text-orange-800" />
                            <span className="text-sm font-medium">100% Arabica</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Leaf size={20} className="text-orange-800" />
                            <span className="text-sm font-medium">Organic</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award size={20} className="text-orange-800" />
                            <span className="text-sm font-medium">Top Rated</span>
                        </div>
                    </div>
                </div>

                {/* 3. Image Section with Decoration */}
                <div className="flex-1 relative">
                    {/* วงกลมตกแต่งด้านหลังรูป */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -right-10 w-32 h-32 border-4 border-dashed border-orange-200 rounded-full -z-10"
                    />

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                            rotate: 4,
                            transition: { type: "spring", stiffness: 200 }
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-[450px] bg-white p-3 rounded-[2.5rem] shadow-2xl cursor-pointer"
                    >
                        <img
                            src={coffee1}
                            alt="Coffee Cup"
                            className="w-full h-full object-cover rounded-[2rem]"
                        />
                        {/* ป้ายลอยขนาดเล็ก */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3"
                        >
                            <div className="bg-orange-100 p-2 rounded-lg">☕</div>
                            <div>
                                <p className="text-xs font-bold text-gray-500">Best Seller</p>
                                <p className="text-sm font-bold text-orange-900">Cappuccino</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </main>
        </section>
    );
}