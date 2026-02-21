const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: {
        type: String,
        enum: ['Retirement', 'House', 'Travel', 'Education', 'Custom'],
        required: true
    },
    targetAmount: { type: Number, required: true },
    targetDate: { type: Date, required: true },
    monthlyContribution: { type: Number, default: 0 },
    expectedReturn: { type: Number, default: 7 }, // Annual %
    inflationRate: { type: Number, default: 6 }, // Annual %
    currentAmount: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
