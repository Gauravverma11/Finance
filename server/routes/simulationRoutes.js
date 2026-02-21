const express = require('express');
const { getSimulation, getHealthScore } = require('../controllers/simulationController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/project', verifyToken, getSimulation);
router.get('/health', verifyToken, getHealthScore);

module.exports = router;
