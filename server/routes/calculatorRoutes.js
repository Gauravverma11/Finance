const express = require('express');
const GoalEngine = require('../services/goalEngine');

const router = express.Router();

router.post('/sip', (req, res) => {
    const { monthlyInvestment, annualReturn, years } = req.body;
    res.json(GoalEngine.calculateSIP(monthlyInvestment, annualReturn, years));
});

router.post('/emi', (req, res) => {
    const { principal, annualInterest, years } = req.body;
    res.json(GoalEngine.calculateEMI(principal, annualInterest, years));
});

module.exports = router;
