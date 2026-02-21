const Goal = require('../models/Goal');
const GoalEngine = require('../services/goalEngine');

exports.createGoal = async (req, res) => {
    try {
        const goal = new Goal({ ...req.body, userId: req.user.id });
        await goal.save();
        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ userId: req.user.id }).lean();
        const goalsWithProjections = goals.map(goal => ({
            ...goal,
            projections: GoalEngine.projectGoal(goal)
        }));
        res.json(goalsWithProjections);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await Goal.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json(goal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'Goal deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
