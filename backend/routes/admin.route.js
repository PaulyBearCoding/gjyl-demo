const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const adminController = require('../../controllers/admin.controller');
const adminValidation = require('../../validations/admin.validation');

const router = express.Router();

// All admin routes require admin role
router.use(auth('admin'));

// Stats routes
router.get('/stats', adminController.getStats);
router.get('/activity', adminController.getRecentActivity);

// User management
router.get('/users', validate(adminValidation.getUsers), adminController.getUsers);
router.get('/users/:userId', validate(adminValidation.getUser), adminController.getUser);
router.patch('/users/:userId', validate(adminValidation.updateUser), adminController.updateUser);
router.delete('/users/:userId', validate(adminValidation.deleteUser), adminController.deleteUser);

// MongoDB console
router.post('/mongo', validate(adminValidation.executeMongoCommand), adminController.executeMongoCommand);

// System management
router.get('/logs', adminController.getLogs);
router.post('/backup', adminController.createBackup);
router.post('/clear-sessions', adminController.clearSessions);

module.exports = router;