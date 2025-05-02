const express = require('express');
const { generateText, generateImage } = require('../controllers/generatorController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/generate-text', protect, generateText);
router.post('/generate-image', protect, generateImage);

module.exports = router;
