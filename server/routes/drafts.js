// routes/drafts.js
const express = require('express');
const router = express.Router();
const { saveDraft, getDrafts } = require('../controllers/draftsController');
const { generateContent } = require('../controllers/aiController');
const { authenticate } = require('../controllers/authController');

router.post('/save', authenticate, saveDraft);
router.get('/', authenticate, getDrafts);
router.post('/generate', authenticate, generateContent);

module.exports = router;
