const express = require('express');
const validate = require('../../middleware/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middleware/auth');
const { requireTwoFactor } = require('../../middleware/twoFactor');
const { conditionalCsrf } = require('../../middleware/csrf');
const { authLimiter } = require('../../middleware/rateLimiter');

const router = express.Router();

// Authentication
router.post('/register', conditionalCsrf, authLimiter, validate(authValidation.register), authController.register);
router.post('/login', conditionalCsrf, authLimiter, validate(authValidation.login), authController.login);
router.post('/verify-2fa', conditionalCsrf, authLimiter, validate(authValidation.verifyTwoFactor), authController.verifyTwoFactor);
router.post('/backup-code', conditionalCsrf, authLimiter, validate(authValidation.validateBackupCode), authController.validateBackupCode);
router.post('/logout', conditionalCsrf, validate(authValidation.logout), authController.logout);
router.post('/logout-all', conditionalCsrf, auth(), validate(authValidation.logoutAll), authController.logoutAll);
router.post('/refresh-tokens', conditionalCsrf, validate(authValidation.refreshTokens), authController.refreshTokens);

// Password management
router.post('/forgot-password', conditionalCsrf, authLimiter, validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', conditionalCsrf, authLimiter, validate(authValidation.resetPassword), authController.resetPassword);
router.post('/change-password', conditionalCsrf, auth(), requireTwoFactor, validate(authValidation.changePassword), authController.changePassword);

// Email verification
router.post('/send-verification-email', conditionalCsrf, auth(), authController.sendVerificationEmail);
router.post('/verify-email', conditionalCsrf, validate(authValidation.verifyEmail), authController.verifyEmail);

// Two-factor authentication
router.post('/2fa/setup', conditionalCsrf, auth(), validate(authValidation.setupTwoFactor), authController.setupTwoFactor);
router.post('/2fa/enable', conditionalCsrf, auth(), validate(authValidation.verifyAndEnableTwoFactor), authController.verifyAndEnableTwoFactor);
router.post('/2fa/disable', conditionalCsrf, auth(), requireTwoFactor, validate(authValidation.disableTwoFactor), authController.disableTwoFactor);

module.exports = router;