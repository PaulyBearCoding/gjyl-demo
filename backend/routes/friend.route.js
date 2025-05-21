const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const friendValidation = require('../../validations/friend.validation');
const friendController = require('../../controllers/friend.controller');

const router = express.Router();

router
  .route('/follow/:userId')
  .post(auth, validate(friendValidation.followUser), friendController.followUser);

router
  .route('/unfollow/:userId')
  .delete(auth, validate(friendValidation.followUser), friendController.unfollowUser);

router
  .route('/followers/:userId')
  .get(auth, validate(friendValidation.getFollowers), friendController.getFollowers);

router
  .route('/following/:userId')
  .get(auth, validate(friendValidation.getFollowers), friendController.getFollowing);

router
  .route('/suggestions')
  .get(auth, validate(friendValidation.getSuggestions), friendController.getSuggestions);

module.exports = router;