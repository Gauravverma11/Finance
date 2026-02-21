const LearningModule = require('../models/LearningModule');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

exports.getModules = async (req, res) => {
    try {
        const modules = await LearningModule.find().lean();
        const progress = await UserProgress.find({ userId: req.user.id });

        const modulesWithProgress = modules.map(m => {
            const p = progress.find(pg => pg.moduleId.toString() === m._id.toString());
            return {
                ...m,
                progress: p ? p.completionPercentage : 0,
                isCompleted: p ? p.isCompleted : false
            };
        });

        res.json(modulesWithProgress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getModuleProgress = async (req, res) => {
    try {
        const progress = await UserProgress.findOne({
            userId: req.user.id,
            moduleId: req.params.moduleId
        });
        res.json(progress || { completionPercentage: 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.completeModule = async (req, res) => {
    try {
        const { moduleId, quizAccuracy } = req.body;
        const learningModule = await LearningModule.findById(moduleId);

        let progress = await UserProgress.findOne({ userId: req.user.id, moduleId });
        if (!progress) {
            progress = new UserProgress({ userId: req.user.id, moduleId });
        }

        progress.completionPercentage = 100;
        progress.quizAccuracy = quizAccuracy;
        progress.isCompleted = true;
        await progress.save();

        // Reward XP
        await User.findByIdAndUpdate(req.user.id, {
            $inc: { xp: learningModule.xpValue, streak: 1 },
            lastActive: Date.now()
        });

        res.json(progress);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
