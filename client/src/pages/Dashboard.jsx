import { useState, useEffect } from 'react';
import api from '../api';
import GrowthChart from '../components/GrowthChart';
import FinancialHealthCard from '../components/FinancialHealthCard';
import ProfileForm from '../components/ProfileForm';
import TransactionForm from '../components/TransactionForm';
import { Target, ArrowUpRight, Plus, Zap, TrendingUp, Wallet, Settings, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [health, setHealth] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isTxOpen, setIsTxOpen] = useState(false);

    const fetchDashboardData = async () => {
        try {
            // First get user profile to use in simulation
            const profileRes = await api.get('/auth/profile');
            const userData = profileRes.data;
            setUser(userData);

            const [simRes, healthRes] = await Promise.all([
                api.post('/simulations/project', {
                    monthlyIncome: userData?.monthlyIncome || 0,
                    fixedExpenses: userData?.fixedExpenses || 0,
                    monthlyInvestment: ((userData?.monthlyIncome || 0) - (userData?.fixedExpenses || 0)) * 0.2 || 0,
                    expectedReturn: 10,
                    currentNetWorth: (userData?.totalInvestments || 0) + (userData?.emergencyFund || 0)
                }),
                api.get('/simulations/health')
            ]);
            setData(simRes.data);
            setHealth(healthRes.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const savings = (user?.monthlyIncome || 0) - (user?.fixedExpenses || 0);

    return (
        <div className="p-4 sm:p-10 max-w-7xl mx-auto animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
                        Hey {user?.name?.split(' ')?.[0] || 'User'} <span className="inline-block animate-bounce">👋</span>
                    </h1>
                    <p className="text-white/40">Track your progress & financial goals ✨</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsProfileOpen(true)}
                        className="bg-white/5 hover:bg-white/10 p-3 rounded-xl border border-white/10 transition-all text-white/60 hover:text-white"
                        title="Update Profile"
                    >
                        <Settings size={20} />
                    </button>
                    <button
                        onClick={() => setIsTxOpen(true)}
                        className="btn-primary flex items-center gap-2"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <Plus size={18} /> Add Transaction
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                <FinancialHealthCard score={health?.score || 0} category={health?.category || 'N/A'} />

                <div className="lg:col-span-2 glass-card">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold">Net Worth Projection</h3>
                        <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold">
                            <ArrowUpRight size={16} /> Based on your profile
                        </div>
                    </div>
                    {data && <GrowthChart data={data.history} />}
                    <div className="mt-4 text-[10px] text-white/20 italic">
                        * Projection assumes consistent monthly savings and 10% annual return.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { icon: <Wallet size={22} />, value: `$${savings.toLocaleString()}`, label: 'Monthly Savings', color: 'from-pink-500/15 to-violet-500/15' },
                    { icon: <TrendingUp size={22} />, value: `$${(user?.totalInvestments || 0).toLocaleString()}`, label: 'Investments', color: 'from-fuchsia-500/15 to-pink-500/15' },
                    { icon: <Zap size={22} className="rotate-12" />, value: user?.xp || 0, label: 'XP Earned', color: 'from-violet-500/15 to-purple-500/15' },
                    { icon: <Shield size={22} />, value: `$${(user?.emergencyFund || 0).toLocaleString()}`, label: 'Emergency Fund', color: 'from-rose-500/15 to-pink-500/15' },
                ].map((stat, i) => (
                    <div key={i} className="glass-card flex flex-col items-center justify-center text-center py-6 sm:py-8 group">
                        <div className={`icon-badge mb-4 bg-gradient-to-br ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div className="text-xl sm:text-2xl font-extrabold mb-1">{stat.value}</div>
                        <div className="text-white/35 text-[10px] sm:text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                    </div>
                ))}
            </div>

            {isProfileOpen && (
                <ProfileForm
                    user={user}
                    onClose={() => setIsProfileOpen(false)}
                    onUpdate={fetchDashboardData}
                />
            )}
            {isTxOpen && (
                <TransactionForm
                    onClose={() => setIsTxOpen(false)}
                    onUpdate={fetchDashboardData}
                />
            )}
        </div>
    );
};

export default Dashboard;
