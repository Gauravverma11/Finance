const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'LearningModule', required: true },
    completionPercentage: { type: Number, default: 0 },
    quizAccuracy: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', userProgressSchema);
