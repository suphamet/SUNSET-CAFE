import { motion } from "framer-motion";

export default function KPICard({ title, value, icon, color }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`${color} p-8 rounded-[2rem] border border-white shadow-xl shadow-orange-900/5 flex items-center justify-between`}
        >
            <div>
                <p className="text-orange-900/60 font-bold text-sm mb-1">{title}</p>
                <h3 className="text-3xl font-serif font-bold text-orange-950">{value}</h3>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm">
                {icon}
            </div>
        </motion.div>
    );
}
