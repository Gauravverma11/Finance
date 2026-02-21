import { useState } from 'react';
import api from '../api';
import { X, Sparkles, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const GoalForm = ({ onClose, onGoalAdded }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: 'Custom',
        targetAmount: '',
        targetDate: '',
        currentAmount: '',
        monthlyContribution: '',
        expectedReturn: 7,
        inflationRate: 6
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/goals', formData);
            toast.success('Goal added successfully! ✨');
            onGoalAdded();
            onClose();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add goal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="glass-card w-full max-w-2xl relative z-10 animate-fade-in-up overflow-y-auto max-h-[90vh]">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}>
                        <Target size={24} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Set a New Goal 🎯</h2>
                        <p className="text-white/40 text-sm">Manifest your financial future</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Goal Title</label>
                            <input
                                type="text"
                                className="w-full input-field"
                                placeholder="e.g. Dream Car, Tokyo Trip"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        {/* Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Category</label>
                            <select
                                className="w-full input-field bg-[#1a1025]"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                required
                            >
                                <option value="Retirement">Retirement 🏖️</option>
                                <option value="House">House 🏡</option>
                                <option value="Travel">Travel ✈️</option>
                                <option value="Education">Education 🎓</option>
                                <option value="Custom">Custom ✨</option>
                            </select>
                        </div>

                        {/* Target Amount */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Target Amount ($)</label>
                            <div className="relative">
                                <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="number"
                                    className="w-full input-field pl-10"
                                    placeholder="0.00"
                                    value={formData.targetAmount}
                                    onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Target Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Target Date</label>
                            <div className="relative">
                                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                                <input
                                    type="date"
                                    className="w-full input-field pl-10"
                                    value={formData.targetDate}
                                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        {/* Current Savings */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Current Savings ($)</label>
                            <input
                                type="number"
                                className="w-full input-field"
                                placeholder="How much you have now"
                                value={formData.currentAmount}
                                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                            />
                        </div>

                        {/* Monthly Contribution */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Monthly Contribution ($)</label>
                            <input
                                type="number"
                                className="w-full input-field"
                                placeholder="Monthly savings for this goal"
                                value={formData.monthlyContribution}
                                onChange={(e) => setFormData({ ...formData, monthlyContribution: e.target.value })}
                            />
                        </div>

                        {/* Expected Return */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1 flex items-center gap-1">
                                Expected Return (%) <TrendingUp size={12} />
                            </label>
                            <input
                                type="number"
                                className="w-full input-field"
                                value={formData.expectedReturn}
                                onChange={(e) => setFormData({ ...formData, expectedReturn: e.target.value })}
                            />
                        </div>

                        {/* Inflation Rate */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/50 ml-1">Inflation Rate (%)</label>
                            <input
                                type="number"
                                className="w-full input-field"
                                value={formData.inflationRate}
                                onChange={(e) => setFormData({ ...formData, inflationRate: e.target.value })}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-4 mt-4 flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Sparkles size={18} className="group-hover:animate-pulse" />
                                <span className="text-lg">Activate Goal</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoalForm;
