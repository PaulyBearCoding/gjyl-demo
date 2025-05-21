const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const groupValidation = require('../../validations/group.validation');
const groupPostValidation = require('../../validations/group-post.validation');
const groupController = require('../../controllers/group.controller');
const groupPostController = require('../../controllers/group-post.controller');

const router = express.Router();

// Group routes
router
  .route('/')
  .post(auth(), validate(groupValidation.createGroup), groupController.createGroup)
  .get(auth(), validate(groupValidation.queryGroups), groupController.getGroups);

router.route('/my-groups').get(auth(), groupController.getUserGroups);

router
  .route('/:groupId')
  .get(auth(), validate(groupValidation.getGroup), groupController.getGroup)
  .patch(auth(), validate(groupValidation.updateGroup), groupController.updateGroup)
  .delete(auth(), validate(groupValidation.deleteGroup), groupController.deleteGroup);

router.route('/by-slug/:slug').get(auth(), validate(groupValidation.getGroupBySlug), groupController.getGroupBySlug);

router.route('/:groupId/join').post(auth(), validate(groupValidation.joinGroup), groupController.joinGroup);
router.route('/:groupId/leave').post(auth(), validate(groupValidation.leaveGroup), groupController.leaveGroup);

router
  .route('/:groupId/members/:userId/role')
  .patch(auth(), validate(groupValidation.changeMemberRole), groupController.changeMemberRole);

router
  .route('/:groupId/members/:userId')
  .delete(auth(), validate(groupValidation.removeMember), groupController.removeMember);

router
  .route('/:groupId/requests/:userId')
  .patch(auth(), validate(groupValidation.handleMembershipRequest), groupController.handleMembershipRequest);

router
  .route('/:groupId/transfer-ownership')
  .post(auth(), validate(groupValidation.transferOwnership), groupController.transferOwnership);

router.route('/:groupId/upload-image').post(auth(), groupController.uploadGroupImage);

// Group post routes
router
  .route('/:groupId/posts')
  .post(auth(), validate(groupPostValidation.createGroupPost), groupPostController.createGroupPost)
  .get(auth(), validate(groupPostValidation.getGroupPosts), groupPostController.getGroupPosts);

router.route('/:groupId/posts/unapproved').get(auth(), validate(groupPostValidation.getUnapprovedPosts), groupPostController.getUnapprovedPosts);

router.route('/:groupId/upload-media').post(auth(), groupPostController.uploadGroupPostMedia);

router
  .route('/posts/:postId')
  .get(auth(), validate(groupPostValidation.getGroupPost), groupPostController.getGroupPost)
  .patch(auth(), validate(groupPostValidation.updateGroupPost), groupPostController.updateGroupPost)
  .delete(auth(), validate(groupPostValidation.deleteGroupPost), groupPostController.deleteGroupPost);

router
  .route('/posts/:postId/like')
  .post(auth(), validate(groupPostValidation.likeGroupPost), groupPostController.likeGroupPost);

router
  .route('/posts/:postId/moderate')
  .patch(auth(), validate(groupPostValidation.moderatePost), groupPostController.moderatePost);

module.exports = router;