const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const commentValidation = require('../../validations/comment.validation');
const commentController = require('../../controllers/comment.controller');

const router = express.Router();

// Post comments routes
router.get('/:postId/comments', auth(), commentController.getComments);
router.post('/:postId/comments', auth(), validate(commentValidation.createComment), commentController.createComment);

// Comment actions routes
router.patch('/comments/:commentId', auth(), validate(commentValidation.updateComment), commentController.updateComment);
router.delete('/comments/:commentId', auth(), commentController.deleteComment);
router.post('/comments/:commentId/like', auth(), commentController.toggleLike);

module.exports = router;