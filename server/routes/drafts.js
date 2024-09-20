const express = require("express");
const router = express.Router();
const {
  saveDraft,
  getDrafts,
  postContent,
} = require("../controllers/draftsController");
const { generateContent } = require("../controllers/aiController");
const { auth } = require('../middleware/auth')

router.post("/save", auth, saveDraft);
router.get("/", auth, getDrafts);
router.post("/generate", auth, generateContent);
router.post("/postContent", auth, postContent);

module.exports = router;
