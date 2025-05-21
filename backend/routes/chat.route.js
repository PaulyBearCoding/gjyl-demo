const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();

router
  .route('/conversations')
  .get(auth, chatController.getConversations)
  .post(auth, validate(chatValidation.createConversation), chatController.createConversation);

router
  .route('/conversations/:conversationId')
  .get(auth, validate(chatValidation.getConversation), chatController.getConversation);

router
  .route('/messages')
  .post(auth, validate(chatValidation.sendMessage), chatController.sendMessage);

router
  .route('/messages/:messageId/read')
  .patch(auth, validate(chatValidation.markAsRead), chatController.markAsRead);

router
  .route('/messages/:conversationId')
  .get(auth, validate(chatValidation.getMessages), chatController.getMessages);

router
  .route('/online-users')
  .get(auth, chatController.getOnlineUsers);

module.exports = router;