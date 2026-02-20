import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Lock, User, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Register({ onBackToLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/User/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                }),
            });

            if (response.ok) {
                setSuccess(true);
                // Auto redirect to login after 2 seconds
                setTimeout(() => {
                    onBackToLogin();
                }, 2000);
            } else {
                const data = await response.json().catch(() => ({}));
                setError(data.message || 'การสมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            }
        } catch (err) {
            setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
            console.error('Registration error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#faf7f2] p-4 font-sans text-orange-950">
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
                                <User className="text-white" size={32} />
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-white mb-2 tracking-tight">Join Sunset</h1>
                            <p className="text-orange-100/80 font-medium tracking-wide uppercase text-[10px] font-bold">Create New Account</p>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-10">
                        <AnimatePresence mode="wait">
                            {success ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-10"
                                >
                                    <div className="bg-green-50 text-green-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Registration Success!</h3>
                                    <p className="text-orange-900/60">Welcome to the family. Redirecting to login...</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <button
                                        onClick={onBackToLogin}
                                        className="text-sm font-bold text-orange-800 hover:text-orange-900 flex items-center gap-2 mb-2 transition-colors"
                                    >
                                        <ArrowRight className="rotate-180" size={16} /> Back to Entry
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
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5Col-span-2">
                                                <label className="text-[11px] uppercase tracking-widest font-black text-orange-900/40 ml-1">Username</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={18} />
                                                    <input
                                                        name="username"
                                                        type="text"
                                                        value={formData.username}
                                                        onChange={handleChange}
                                                        className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium"
                                                        placeholder="coffee_lover"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] uppercase tracking-widest font-black text-orange-900/40 ml-1">Email Address</label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={18} />
                                                <input
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium"
                                                    placeholder="hello@example.com"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] uppercase tracking-widest font-black text-orange-900/40 ml-1">Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={18} />
                                                <input
                                                    name="password"
                                                    type="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] uppercase tracking-widest font-black text-orange-900/40 ml-1">Confirm Password</label>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-900/30" size={18} />
                                                <input
                                                    name="confirmPassword"
                                                    type="password"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full bg-orange-50/30 border border-orange-100 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-800/10 focus:border-orange-800 transition-all font-medium"
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full bg-orange-800 text-white rounded-2xl py-4 font-bold text-lg hover:bg-orange-900 transition-all active:scale-[0.98] shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2 group disabled:opacity-70 mt-4"
                                        >
                                            {isLoading ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>Create Account</>
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
