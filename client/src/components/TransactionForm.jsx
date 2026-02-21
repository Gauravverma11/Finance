import { useState } from 'react';
import api from '../api';
import { X, Sparkles, DollarSign, Wallet, TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';

const TransactionForm = ({ onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        type: 'Investment',
        amount: '',
        category: 'Stocks',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate transaction by updating user's totalInvestments or emergencyFund
            const profileRes = await api.get('/auth/profile');
            const user = profileRes.data;

            let updateData = {};
            if (formData.type === 'Investment') {
                updateData.totalInvestments = (user.totalInvestments || 0) + Number(formData.amount);
            } else if (formData.type === 'Emergency') {
                updateData.emergencyFund = (user.emergencyFund || 0) + Number(formData.amount);
            }
            // Add XP for adding a transaction
            updateData.xp = (user.xp || 0) + 10;

            await api.put('/auth/profile', updateData);
            toast.success(`Succesfully added $${formData.amount} to your ${formData.type}! 🚀`);
            onUpdate();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Transaction failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="glass-card w-full max-w-lg relative z-10 animate-fade-in-up">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
                    <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        <DollarSign size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Add Funds 💸</h2>
                        <p className="text-white/40 text-sm">Grow your net worth in real-time</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
                        {['Investment', 'Emergency'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: t })}
                                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${formData.type === t ? 'bg-pink-500 text-white shadow-lg' : 'text-white/40 hover:text-white/60'
                                    }`}
                            >
                                {t === 'Investment' ? <ArrowUpRight size={16} /> : <TrendingUp size={16} />}
                                {t}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Amount ($)</label>
                        <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="number"
                                className="w-full input-field pl-10"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Category</label>
                        <select
                            className="w-full input-field bg-[#1a1025]"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                        >
                            <option value="Stocks">Stocks 📈</option>
                            <option value="Crypto">Crypto 🪙</option>
                            <option value="Real Estate">Real Estate 🏠</option>
                            <option value="Bank">Bank AC 🏦</option>
                            <option value="Cash">Cash 💵</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Memo</label>
                        <input
                            type="text"
                            className="w-full input-field"
                            placeholder="Optional note..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 mt-2 flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Sparkles size={18} />
                                <span className="text-lg">Track Transaction</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TransactionForm;
