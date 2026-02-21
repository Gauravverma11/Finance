const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import routes (AFTER dotenv so process.env is available)
const authRoutes = require('./routes/authRoutes.js');
const goalRoutes = require('./routes/goalRoutes.js');
const learningRoutes = require('./routes/learningRoutes.js');
const simulationRoutes = require('./routes/simulationRoutes.js');
const calculatorRoutes = require('./routes/calculatorRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/calculators', calculatorRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Finance Learning API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});
