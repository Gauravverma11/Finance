const mongoose = require('mongoose');
const dotenv = require('dotenv');
const LearningModule = require('./models/LearningModule');

dotenv.config();

const modules = [
    {
        title: 'Budgeting Basics',
        slug: 'budgeting-basics',
        category: 'Budgeting',
        content: 'Budgeting is the foundation of financial health. It involves tracking income and expenses...',
        examples: [
            { scenario: 'You earn $3000 and spend $2500.', outcome: 'You have a $500 surplus for savings.' }
        ],
        quizzes: [
            {
                question: 'What is the first step in budgeting?',
                options: ['Buying a car', 'Tracking income', 'Investing in stocks', 'Spending everything'],
                correctAnswer: 1,
                explanation: 'Knowing how much money is coming in is essential.'
            }
        ],
        xpValue: 100
    },
    {
        title: 'Investing Basics',
        slug: 'investing-basics',
        category: 'Investing',
        content: 'Investing is the process of putting money into assets with the expectation of a profit...',
        examples: [
            { scenario: 'Investing $1000 in a diversed fund.', outcome: 'Long term growth through compounding.' }
        ],
        quizzes: [
            {
                question: 'What is diversification?',
                options: ['Putting all money in one stock', 'Spreading risk across assets', 'Keeping money in a locker', 'Selling everything'],
                correctAnswer: 1,
                explanation: 'Diversification reduces risk by spreading investments.'
            }
        ],
        xpValue: 150
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        await LearningModule.deleteMany({});
        await LearningModule.insertMany(modules);
        console.log('Database Seeded');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
