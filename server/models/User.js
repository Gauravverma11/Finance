const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    monthlyIncome: { type: Number, default: 0 },
    fixedExpenses: { type: Number, default: 0 },
    emergencyFund: { type: Number, default: 0 },
    totalInvestments: { type: Number, default: 0 },
    age: { type: Number },
    riskPreference: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    financialGoalsPreference: [String],
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streak: { type: Number, default: 0 },
    lastActive: { type: Date, default: Date.now },
    refreshToken: { type: String }
}, { timestamps: true });

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
