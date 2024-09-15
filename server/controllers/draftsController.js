const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Draft = require('../models/draft');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

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

// Get all drafts for the authenticated user
exports.getDrafts = async (req, res) => {
    try {
        // Find drafts for the authenticated user
        const drafts = await Draft.find({ user: req.user.userId });

        // Respond with the drafts
        res.json(drafts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};