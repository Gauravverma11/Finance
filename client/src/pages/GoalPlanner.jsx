import { useState, useEffect } from 'react';
import api from '../api';
import { Target, TrendingUp, Calendar, AlertTriangle, Plus, Sparkles } from 'lucide-react';
import GoalForm from '../components/GoalForm';

const GoalPlanner = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const fetchGoals = async () => {
        try {
            const res = await api.get('/goals');
            setGoals(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center h-full">
            <div className="w-10 h-10 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="p-10 max-w-7xl mx-auto animate-fade-in-up">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold mb-2">
                        My Financial Goals <span className="text-2xl">🎯</span>
                    </h1>
                    <p className="text-white/40">Plan and track your future milestones ✨</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Plus size={18} /> Create New Goal
                    </span>
                </button>
            </div>

            <div className="space-y-5">
                {goals.map((goal) => (
                    <div key={goal._id} className="glass-card grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                        <div className="flex items-center gap-4">
                            <div className="icon-badge">
                                <Target size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold">{goal.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-pink-400/60 uppercase tracking-wider font-semibold">{goal.type}</span>
                                    {goal.isCompleted && (
                                        <span className="text-[10px] bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded-md font-bold uppercase">Done</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-white/35 mb-2 flex items-center gap-2 font-medium">
                                <TrendingUp size={14} /> Progress
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 progress-bar-track">
                                    <div
                                        className="progress-bar-fill"
                                        style={{ width: `${Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)}%` }}
                                    />
                                </div>
                                <span className="text-sm font-bold text-pink-400">{Math.round((goal.currentAmount / goal.targetAmount) * 100)}%</span>
                            </div>
                        </div>

                        <div>
                            <div className="text-sm text-white/35 mb-1 flex items-center gap-2 font-medium">
                                <Calendar size={14} /> Target Date
                            </div>
                            <div className="font-bold">{new Date(goal.targetDate).toLocaleDateString()}</div>
                        </div>

                        <div className="text-right">
                            <div className="text-2xl font-extrabold gradient-text">${goal.targetAmount.toLocaleString()}</div>
                            {goal.projections?.shortfall > 0 && !goal.isCompleted && (
                                <div className="text-xs text-amber-400 flex items-center justify-end gap-1 mt-1 font-semibold">
                                    <AlertTriangle size={12} /> ${goal.projections.monthlyShortfallDetection.toLocaleString()}/mo shortfall
                                </div>
                            )}
                            {goal.isCompleted && (
                                <div className="text-xs text-pink-400 flex items-center justify-end gap-1 mt-1 font-semibold">
                                    <Sparkles size={12} /> Goal Achieved!
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {goals.length === 0 && (
                    <div className="text-center py-20 glass-card" style={{ border: '2px dashed rgba(236, 72, 153, 0.2)' }}>
                        <Sparkles size={40} className="mx-auto text-pink-500/30 mb-4" />
                        <div className="text-white/35 mb-4 text-lg">No goals created yet. Start planning today!</div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="text-pink-400 font-bold hover:text-pink-300 transition-colors"
                        >
                            Add your first goal ✨
                        </button>
                    </div>
                )}
            </div>

            {isFormOpen && (
                <GoalForm
                    onClose={() => setIsFormOpen(false)}
                    onGoalAdded={fetchGoals}
                />
            )}
        </div>
    );
};

export default GoalPlanner;
