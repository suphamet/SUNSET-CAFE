import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/productSlice";
import { ShoppingBag, TrendingUp, Users, Calendar, RefreshCcw } from "lucide-react";
import KPICard from "../../common/KPICard";

export default function StaffDashboard() {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.product.orders) || [];
    const orderStatus = useSelector((state) => state.product.orderStatus);

    useEffect(() => {
        dispatch(fetchOrders());
        // Refresh every minute
        const interval = setInterval(() => dispatch(fetchOrders()), 60000);
        return () => clearInterval(interval);
    }, [dispatch]);

    // Calculate KPIs
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const totalOrdersCount = orders.length;

    // Calculate Peak Hour
    const hourCounts = orders.reduce((acc, order) => {
        if (order.date) {
            const hour = new Date(order.date).getHours();
            acc[hour] = (acc[hour] || 0) + 1;
        }
        return acc;
    }, {});

    let peakHour = -1;
    let maxCount = 0;
    Object.entries(hourCounts).forEach(([hour, count]) => {
        if (count > maxCount) {
            maxCount = count;
            peakHour = parseInt(hour);
        }
    });

    const peakHourStr = peakHour !== -1
        ? `${peakHour}:00 - ${peakHour + 1}:00`
        : '-';

    return (
        <div className="min-h-screen bg-[#faf7f2] p-4 md:p-10 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-orange-950">Staff Dashboard</h1>
                        <p className="text-orange-900/60 font-medium">Monitoring real-time orders & business performance</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-orange-100">
                        <Calendar className="text-orange-800" size={20} />
                        <span className="font-bold text-orange-950">{new Date().toLocaleDateString('th-TH', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}</span>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <KPICard
                        title="Total Revenue"
                        value={`฿${totalRevenue.toLocaleString()}`}
                        icon={<TrendingUp className="text-green-600" size={24} />}
                        color="bg-green-50"
                    />
                    <KPICard
                        title="Orders Today"
                        value={totalOrdersCount}
                        icon={<ShoppingBag className="text-blue-600" size={24} />}
                        color="bg-blue-50"
                    />
                    <KPICard
                        title="Peak Hour"
                        value={peakHourStr}
                        icon={<div className="text-orange-600 font-bold text-lg">🕒</div>}
                        color="bg-orange-50"
                    />
                </div>

                {/* Orders Table/List */}
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-orange-900/5 border border-orange-100 overflow-hidden">
                    <div className="p-8 border-b border-orange-50 flex justify-between items-center">
                        <h2 className="text-2xl font-serif font-bold text-orange-950">Recent Orders</h2>
                        <button
                            onClick={() => dispatch(fetchOrders())}
                            disabled={orderStatus === 'loading'}
                            className="flex items-center gap-2 bg-orange-100/50 hover:bg-orange-100 text-orange-800 px-5 py-2.5 rounded-2xl transition-all font-bold text-sm active:scale-95 disabled:opacity-50"
                        >
                            <RefreshCcw size={16} className={orderStatus === 'loading' ? 'animate-spin' : ''} />
                            {orderStatus === 'loading' ? 'Refreshing...' : 'Refresh'}
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-orange-50/50">
                                <tr>
                                    <th className="px-8 py-5 text-orange-950 font-bold text-sm uppercase tracking-wider">Order No.</th>
                                    <th className="px-8 py-5 text-orange-950 font-bold text-sm uppercase tracking-wider">Customer</th>
                                    <th className="px-8 py-5 text-orange-950 font-bold text-sm uppercase tracking-wider">Items</th>
                                    <th className="px-8 py-5 text-orange-950 font-bold text-sm uppercase tracking-wider">Total</th>
                                    <th className="px-8 py-5 text-orange-950 font-bold text-sm uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100/50">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-20 text-center text-gray-400 italic">
                                            No orders found today.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order, idx) => (
                                        <tr key={order.orderNo || idx} className="hover:bg-orange-50/30 transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-orange-950">{order.orderNo}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-gray-800">{order.customer}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-wrap gap-1 max-w-xs">
                                                    {(order.items || []).map((item, i) => (
                                                        <span key={i} className="bg-white border border-orange-100 text-[10px] font-bold px-2 py-1 rounded-full text-orange-900">
                                                            {item.qty}x {item.product}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-lg font-serif font-bold text-orange-800 text-nowrap">
                                                ฿{(order.total || 0).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-6 text-right text-sm text-orange-900/40 font-medium">
                                                {order.date ? new Date(order.date).toLocaleTimeString() : '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

