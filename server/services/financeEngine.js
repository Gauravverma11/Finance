/**
 * Handles general financial simulations and calculations.
 */
class FinanceEngine {
    /**
     * Simulates net worth growth over a period.
     */
    static simulateGrowth(initialNetWorth, monthlyIncome, fixedExpenses, monthlyInvestment, expectedReturn, months = 12) {
        let currentNetWorth = initialNetWorth;
        const monthlyReturnRate = expectedReturn / 100 / 12;
        const history = [];

        for (let i = 1; i <= months; i++) {
            const investmentGain = currentNetWorth * monthlyReturnRate;
            const netSavings = monthlyIncome - fixedExpenses - monthlyInvestment;
            currentNetWorth += investmentGain + monthlyInvestment + netSavings;

            history.push({
                month: i,
                netWorth: Math.round(currentNetWorth),
                savings: Math.round(netSavings * i)
            });
        }

        return {
            projectedNetWorth: Math.round(currentNetWorth),
            history
        };
    }

    /**
     * Calculates Financial Health Score (0-100)
     */
    static calculateHealthScore(data) {
        const {
            savingsRate, // (Income - Expenses) / Income
            debtToIncomeRatio,
            emergencyFundMonths,
            investmentConsistency,
            goalProgress
        } = data;

        let score = 0;

        // Savings Rate (Max 25 pts)
        score += Math.min(savingsRate * 100 / 2, 25);

        // Debt-to-Income (Max 20 pts)
        score += Math.max(20 - (debtToIncomeRatio * 100 / 2), 0);

        // Emergency Fund (Max 20 pts)
        score += Math.min(emergencyFundMonths * 3.33, 20); // 6 months = full points

        // Investment Consistency (Max 15 pts)
        score += investmentConsistency * 15;

        // Goal Progress (Max 20 pts)
        score += goalProgress * 20;

        let category = 'Poor';
        if (score > 80) category = 'Excellent';
        else if (score > 60) category = 'Good';
        else if (score > 40) category = 'Average';

        return { score: Math.round(score), category };
    }
}

module.exports = FinanceEngine;
