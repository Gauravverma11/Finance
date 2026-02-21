const mongoose = require('mongoose');

const learningModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    examples: [{
        scenario: String,
        outcome: String
    }],
    quizzes: [{
        question: String,
        options: [String],
        correctAnswer: Number, // Index of options
        explanation: String
    }],
    xpValue: { type: Number, default: 100 }
}, { timestamps: true });

module.exports = mongoose.model('LearningModule', learningModuleSchema);
