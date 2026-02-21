const express = require('express');
const { getModules, getModuleProgress, completeModule } = require('../controllers/learningController');
const { verifyToken } = require('../middlewares/auth');

const router = express.Router();

router.get('/modules', verifyToken, getModules);
router.get('/progress/:moduleId', verifyToken, getModuleProgress);
router.post('/complete', verifyToken, completeModule);

module.exports = router;
