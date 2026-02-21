/**
 * Handles goal-specific calculations and general calculators (SIP, EMI, etc.)
 */
class GoalEngine {
    /**
     * Inflation Adjusted Target
     * FV = PV * (1 + inflation)^years
     */
    static getInflationAdjustedTarget(targetAmount, years, annualInflation) {
        return targetAmount * Math.pow(1 + annualInflation / 100, years);
    }

    /**
     * SIP Calculator
     * FV = P × [((1 + r)^n − 1) / r] × (1 + r)
     */
    static calculateSIP(monthlyInvestment, annualReturn, years) {
        const r = annualReturn / 100 / 12;
        const n = years * 12;
        const futureValue = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
        const totalInvested = monthlyInvestment * n;

        return {
            futureValue: Math.round(futureValue),
            totalInvested: Math.round(totalInvested),
            totalEarnings: Math.round(futureValue - totalInvested)
        };
    }

    /**
     * EMI Calculator
     * EMI = [P × r × (1+r)^n] / [(1+r)^n − 1]
     */
    static calculateEMI(principal, annualInterest, years) {
        const r = annualInterest / 100 / 12;
        const n = years * 12;
        const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalPayment = emi * n;

        return {
            emi: Math.round(emi),
            totalPayment: Math.round(totalPayment),
            totalInterest: Math.round(totalPayment - principal)
        };
    }

    /**
     * Goal Progress Projection
     */
    static projectGoal(goal) {
        const now = new Date();
        const target = new Date(goal.targetDate);
        const monthsRemaining = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());

        if (monthsRemaining <= 0) return { shortfall: 0, status: 'Target Date Reached' };

        const sipData = this.calculateSIP(goal.monthlyContribution || 0, goal.expectedReturn || 7, monthsRemaining / 12);
        const inflationAdjustedTarget = this.getInflationAdjustedTarget(goal.targetAmount || 0, monthsRemaining / 12, goal.inflationRate || 6);

        const projectedAmount = (goal.currentAmount || 0) + sipData.futureValue;
        const shortfall = Math.max(0, inflationAdjustedTarget - projectedAmount);

        return {
            inflationAdjustedTarget: Math.round(inflationAdjustedTarget),
            projectedAmount: Math.round(projectedAmount),
            shortfall: Math.round(shortfall),
            monthlyShortfallDetection: shortfall > 0 ? Math.round(shortfall / monthsRemaining) : 0
        };
    }
}

module.exports = GoalEngine;
