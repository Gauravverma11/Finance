import { useState } from 'react';
import api from '../api';
import { X, Sparkles, DollarSign, Wallet, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const ProfileForm = ({ user, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        monthlyIncome: user?.monthlyIncome || '',
        fixedExpenses: user?.fixedExpenses || '',
        emergencyFund: user?.emergencyFund || '',
        totalInvestments: user?.totalInvestments || '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.put('/auth/profile', formData);
            toast.success('Financial profile updated! 📈');
            onUpdate();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Update failed');
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
                        <Shield size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Financial Profile 💳</h2>
                        <p className="text-white/40 text-sm">Keep your stats up to date</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Monthly Income ($)</label>
                        <div className="relative">
                            <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                            <input
                                type="number"
                                className="w-full input-field pl-10"
                                value={formData.monthlyIncome}
                                onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Monthly Fixed Expenses ($)</label>
                        <input
                            type="number"
                            className="w-full input-field"
                            value={formData.fixedExpenses}
                            onChange={(e) => setFormData({ ...formData, fixedExpenses: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Emergency Fund ($)</label>
                        <input
                            type="number"
                            className="w-full input-field"
                            value={formData.emergencyFund}
                            onChange={(e) => setFormData({ ...formData, emergencyFund: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/50 ml-1">Total Current Investments ($)</label>
                        <input
                            type="number"
                            className="w-full input-field"
                            value={formData.totalInvestments}
                            onChange={(e) => setFormData({ ...formData, totalInvestments: e.target.value })}
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
                                <span className="text-lg">Update Profile</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileForm;
