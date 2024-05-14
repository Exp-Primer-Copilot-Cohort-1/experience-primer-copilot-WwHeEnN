// Create web server 
// Create a comment
// Read a comment
// Update a comment
// Delete a comment

// 1. Importing modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const User = require('../models/user');
const auth = require('../middleware/auth');

// 2. Create a comment
router.post('/comments', auth, async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 3. Read a comment
router.get('/comments', auth, async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.send(comments);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 4. Update a comment
router.patch('/comments/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment);
    } catch (error) {
        res.status(400).send(error);
    }
});

// 5. Delete a comment
router.delete('/comments/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;