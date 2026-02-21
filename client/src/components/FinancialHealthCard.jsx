import { ShieldCheck, TrendingUp, Wallet } from 'lucide-react';

const FinancialHealthCard = ({ score, category }) => {
    const getStatusColor = () => {
        if (score >= 80) return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
        if (score >= 60) return 'text-violet-400 bg-violet-500/10 border-violet-500/20';
        if (score >= 40) return 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20';
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    };

    return (
        <div className="glass-card">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Financial Health</h3>
                <ShieldCheck className="text-pink-400" />
            </div>

            <div className="flex items-end gap-4 mb-6">
                <span className="text-5xl font-extrabold gradient-text">{score}</span>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor()}`}>
                    {category}
                </div>
            </div>

            <div className="progress-bar-track mb-8">
                <div className="progress-bar-fill" style={{ width: `${score}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/35 text-xs mb-1">
                        <TrendingUp size={14} /> Savings Rate
                    </div>
                    <div className="text-lg font-bold">24%</div>
                </div>
                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/5">
                    <div className="flex items-center gap-2 text-white/35 text-xs mb-1">
                        <Wallet size={14} /> Debt Ratio
                    </div>
                    <div className="text-lg font-bold">12%</div>
                </div>
            </div>
        </div>
    );
};

export default FinancialHealthCard;
