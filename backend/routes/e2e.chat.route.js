const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const e2eChatValidation = require('../../validations/e2e.chat.validation');
const e2eChatController = require('../../controllers/e2e.chat.controller');

const router = express.Router();

// Initialize encryption for a conversation
router.post(
  '/conversations/:conversationId/encryption/initialize',
  auth(),
  validate(e2eChatValidation.initializeEncryption),
  e2eChatController.initializeEncryption
);

// Generate encryption keys for the current user
router.post(
  '/keys/generate',
  auth(),
  validate(e2eChatValidation.generateKeys),
  e2eChatController.generateKeys
);

// Get key bundle for establishing a secure session with another user
router.get(
  '/keys/bundle/:targetUserId',
  auth(),
  validate(e2eChatValidation.getKeyBundle),
  e2eChatController.getKeyBundle
);

// Send an encrypted message
router.post(
  '/conversations/:conversationId/messages/encrypted/:recipientId',
  auth(),
  validate(e2eChatValidation.sendEncryptedMessage),
  e2eChatController.sendEncryptedMessage
);

// Verify identity keys between users
router.post(
  '/identity/verify/:targetUserId',
  auth(),
  validate(e2eChatValidation.verifyIdentity),
  e2eChatController.verifyIdentity
);

// Check if a conversation is encrypted
router.get(
  '/conversations/:conversationId/encryption',
  auth(),
  validate(e2eChatValidation.isConversationEncrypted),
  e2eChatController.isConversationEncrypted
);

// Enable or disable encryption for a conversation
router.patch(
  '/conversations/:conversationId/encryption',
  auth(),
  validate(e2eChatValidation.setConversationEncryption),
  e2eChatController.setConversationEncryption
);

module.exports = router;