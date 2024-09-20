const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Draft = require('../models/draft');
const axios =  require("axios")

exports.saveDraft = async (req, res) => {
    try {
        const { title, content, keywords } = req.body;

        const draft = new Draft({
            user: req.user.userId, 
            title,
            content,
            keywords,
        });

        await draft.save();

        res.status(201).json({ draft });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getDrafts = async (req, res) => {
    try {
        const drafts = await Draft.find({ user: req.user.userId });
        res.json(drafts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.postContent =  async (req, res) => {
    const { title, content, userId } = req.body;
    const mediumToken = process.env.MEDIUM_TOKEN; 

    console.log(`title: ${title}, userId: ${userId}`);
  
    try {
      const response = await axios.post(
        `https://api.medium.com/v1/users/${userId}/posts`,
        {
          title: title,
          contentFormat: 'markdown',
          content: content,
          publishStatus: 'public',
        },
        {
          headers: {
            Authorization: `Bearer ${mediumToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error publishing to Medium:', error);
      res.status(500).json({ error: 'Failed to publish to Medium' });
    }
  }
