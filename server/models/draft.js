const mongoose = require('mongoose');

const DraftSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    keywords: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Draft', DraftSchema);
