import { useState } from 'react';
import api from '../api';
import { Calculator, Landmark, Sparkles } from 'lucide-react';

const Calculators = () => {
    const [activeTab, setActiveTab] = useState('sip');
    const [inputs, setInputs] = useState({
        sip: { monthly: 5000, rate: 12, years: 10 },
        emi: { principal: 1000000, rate: 9, years: 15 }
    });
    const [results, setResults] = useState(null);

    const calculate = async (type) => {
        try {
            let res;
            if (type === 'sip') {
                res = await api.post('/calculators/sip', {
                    monthlyInvestment: inputs.sip.monthly,
                    annualReturn: inputs.sip.rate,
                    years: inputs.sip.years
                });
            } else {
                res = await api.post('/calculators/emi', {
                    principal: inputs.emi.principal,
                    annualInterest: inputs.emi.rate,
                    years: inputs.emi.years
                });
            }
            setResults(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-10 max-w-7xl mx-auto animate-fade-in-up">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">
                    Financial Tools <span className="text-2xl">🧮</span>
                </h1>
                <p className="text-white/40">Plan your investments and loans with precision ✨</p>
            </div>

            {/* Tab Buttons */}
            <div className="flex gap-3 mb-8">
                <button
                    onClick={() => { setActiveTab('sip'); setResults(null); }}
                    className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${activeTab === 'sip' ? 'pill-active' : 'pill-inactive'}`}
                >
                    SIP Calculator
                </button>
                <button
                    onClick={() => { setActiveTab('emi'); setResults(null); }}
                    className={`px-6 py-2.5 rounded-full font-bold transition-all text-sm ${activeTab === 'emi' ? 'pill-active' : 'pill-inactive'}`}
                >
                    EMI Calculator
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Input Card */}
                <div className="glass-card">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="icon-badge">
                            <Calculator size={20} />
                        </div>
                        <span className="text-lg font-bold">
                            {activeTab === 'sip' ? 'Systematic Investment Plan' : 'Equated Monthly Installment'}
                        </span>
                    </div>

                    <div className="space-y-5">
                        {activeTab === 'sip' ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Monthly Investment ($)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.sip.monthly}
                                        onChange={(e) => setInputs({ ...inputs, sip: { ...inputs.sip, monthly: Number(e.target.value) } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Expected Return Rate (%)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.sip.rate}
                                        onChange={(e) => setInputs({ ...inputs, sip: { ...inputs.sip, rate: Number(e.target.value) } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Time Period (Years)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.sip.years}
                                        onChange={(e) => setInputs({ ...inputs, sip: { ...inputs.sip, years: Number(e.target.value) } })}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Principal Amount ($)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.emi.principal}
                                        onChange={(e) => setInputs({ ...inputs, emi: { ...inputs.emi, principal: Number(e.target.value) } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Interest Rate (%)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.emi.rate}
                                        onChange={(e) => setInputs({ ...inputs, emi: { ...inputs.emi, rate: Number(e.target.value) } })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-white/40 font-medium">Loan Tenure (Years)</label>
                                    <input
                                        type="number"
                                        className="w-full input-field"
                                        value={inputs.emi.years}
                                        onChange={(e) => setInputs({ ...inputs, emi: { ...inputs.emi, years: Number(e.target.value) } })}
                                    />
                                </div>
                            </>
                        )}
                        <button
                            onClick={() => calculate(activeTab)}
                            className="w-full btn-primary py-3"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Calculate Now <Sparkles size={16} />
                            </span>
                        </button>
                    </div>
                </div>

                {/* Result Card */}
                <div className="glass-card flex flex-col items-center justify-center text-center">
                    {results ? (
                        <div className="w-full space-y-8">
                            <div className="space-y-2">
                                <div className="text-white/35 uppercase tracking-widest text-xs font-bold">
                                    {activeTab === 'sip' ? 'Projected Maturity Value' : 'Monthly EMI Payment'}
                                </div>
                                <div className="text-5xl font-extrabold gradient-text">
                                    ${(activeTab === 'sip' ? results.futureValue : results.emi).toLocaleString()}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                                <div>
                                    <div className="text-white/30 text-xs mb-1 font-medium">Total {activeTab === 'sip' ? 'Invested' : 'Principal'}</div>
                                    <div className="text-xl font-bold">${(activeTab === 'sip' ? results.totalInvested : inputs.emi.principal).toLocaleString()}</div>
                                </div>
                                <div>
                                    <div className="text-white/30 text-xs mb-1 font-medium">Total {activeTab === 'sip' ? 'Earnings' : 'Interest'}</div>
                                    <div className="text-xl font-bold text-pink-400">${(activeTab === 'sip' ? results.totalEarnings : results.totalInterest).toLocaleString()}</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-white/25 space-y-4">
                            <Landmark size={64} className="mx-auto opacity-30" />
                            <p className="font-medium">Enter details on the left to see the breakdown ✨</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Calculators;
