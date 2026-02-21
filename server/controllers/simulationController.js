const FinanceEngine = require('../services/financeEngine');
const User = require('../models/User');

exports.getSimulation = async (req, res) => {
    try {
        const { monthlyIncome, fixedExpenses, monthlyInvestment, expectedReturn, currentNetWorth } = req.body;

        const simulation = FinanceEngine.simulateGrowth(
            currentNetWorth || 0,
            monthlyIncome || 0,
            fixedExpenses || 0,
            monthlyInvestment || 0,
            expectedReturn || 7
        );

        res.json(simulation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHealthScore = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const Goal = require('../models/Goal');
        const goals = await Goal.find({ userId: req.user.id });

        // Calculate real savings rate
        const savings = user.monthlyIncome - user.fixedExpenses;
        const savingsRate = user.monthlyIncome > 0 ? savings / user.monthlyIncome : 0;

        // Calculate goal progress
        const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
        const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
        const goalProgress = totalTarget > 0 ? totalSaved / totalTarget : 0;

        // Emergency fund months
        const emergencyFundMonths = user.fixedExpenses > 0 ? user.emergencyFund / user.fixedExpenses : 0;

        const scoreData = {
            savingsRate: Math.max(0, savingsRate),
            debtToIncomeRatio: 0.1, // Placeholder until debt field added
            emergencyFundMonths,
            investmentConsistency: user.totalInvestments > 0 ? 0.9 : 0.5,
            goalProgress
        };

        const health = FinanceEngine.calculateHealthScore(scoreData);
        res.json(health);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
