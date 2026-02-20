import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Lock, User, ArrowRight, AlertCircle, Users, UserPlus } from 'lucide-react';

export default function Login({ onLogin, onEnterAsCustomer, onGoToRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState('choice'); // 'choice' | 'employee'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/User/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Pass username as well
                onLogin('employee', username);
            } else {
                const data = await response.json().catch(() => ({}));
                setError(data.message || 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
            console.error('Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] p-4 text-orange-950">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full"
            >
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-orange-900/10 border border-orange-100 overflow-hidden">
                    {/* Header */}
                    <div className="bg-orange-800 p-10 text-center relative overflow-hidden">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-10 -right-10 w-40 h-40 bg-orange-700/30 rounded-full blur-3xl text-white"
                        />
                        <Coffee className="text-white/20 absolute top-4 left-4" size={48} />

                        <div className="relative z-10">
                            <div className="bg-white/20 backdrop-blur-md w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/30">
                                {view === 'choice' ? <Coffee className="text-white" size={32} /> : <Lock className="text-white" size={32} />}
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">Sunset Cafe</h1>
                            <p className="text-orange-100/80 font-medium tracking-wide uppercase text-[10px] font-bold">Entrance Authority</p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-10">
                        <AnimatePresence mode="wait">
                            {view === 'choice' ? (
                                <motion.div
                                    key="choice"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <button
                                        onClick={onEnterAsCustomer}
                                        className="w-full bg-orange-50 border-2 border-orange-100 p-6 rounded-[2rem] flex items-center gap-6 hover:border-orange-800 transition-all group active:scale-[0.98]"
                                    >
                                        <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:bg-orange-800 group-hover:text-white transition-colors">
                                            <Users size={28} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xl font-bold text-orange-950 leading-tight">Customer</p>
                                            <p className="text-sm text-orange-900/60 font-medium">Browse & Order</p>
                                        </div>
                                        <ArrowRight className="ml-auto text-orange-200 group-hover:text-orange-800 transition-colors" size={20} />
                                    </button>

                                    <button
                                        onClick={() => setView('employee')}
                                        className="w-full bg-white border-2 border-orange-50 p-6 rounded-[2rem] flex items-center gap-6 hover:border-orange-800 transition-all group active:scale-[0.98]"
                                    >
                                        <div className="bg-orange-50/50 p-4 rounded-2xl shadow-sm group-hover:bg-orange-800 group-hover:text-white transition-colors">
                                            <Lock size={28} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xl font-bold text-orange-950 leading-tight">Staff Account</p>
                                            <p className="text-sm text-orange-900/60 font-medium">Management tools</p>
                                        </div>
                                        <ArrowRight className="ml-auto text-orange-200 group-hover:text-orange-800 transition-colors" size={20} />
                                    </button>

                                    <div className="pt-4 text-center">
                                        <button
                                            onClick={onGoToRegister}
                                            className="text-xs font-bold text-orange-800/40 hover:text-orange-800 flex items-center gap-2 mx-auto transition-colors"
                                        >
                                            <UserPlus size={14} /> Don't have a staff account? Register
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="login"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-6"
                                >
                                    <button
                                        onClick={() => setView('choice')}
                                        className="text-sm font-bold text-orange-800 hover:text-orange-900 flex items-center gap-2 mb-2 transition-colors"
                                    >
                                        <ArrowRight className="rotate-180" size={16} /> Back to Selection
                                    </button>

                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl flex items-center gap-3 text-sm font-bold mb-4"
                                            >
                                                <AlertCircle size={18} />
                                                {error}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-orange-950 ml-1">Username</label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={20} />
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium text-orange-950"
                                                    placeholder="Enter username"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-orange-950 ml-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={20} />
                                                <input
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-orange-50/50 border border-orange-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium text-orange-950"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-orange-800 text-white rounded-2xl py-4 font-bold text-lg hover:bg-orange-900 transition-all active:scale-[0.98] shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 group disabled:opacity-70"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>Sign In to Dashboard</>
                                            )}
                                        </button>
                                    </form>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="px-10 pb-10 text-center border-t border-orange-50/50 pt-8">
                        <p className="text-orange-900/40 text-[9px] font-bold uppercase tracking-[0.4em]">
                            Sunset Cafe Operational System v1.1
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
