const express = require('express');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate');
const eventValidation = require('../../validations/group-event.validation');
const eventController = require('../../controllers/group-event.controller');

const router = express.Router();

// User's upcoming events across all groups
router
  .route('/user/upcoming')
  .get(auth(), validate(eventValidation.getUserUpcomingEvents), eventController.getUserUpcomingEvents);

// Group events for a specific group
router
  .route('/group/:groupId')
  .get(auth(), validate(eventValidation.getEvents), eventController.getEvents)
  .post(auth(), validate(eventValidation.createEvent), eventController.createEvent);

// Single event operations
router
  .route('/:eventId')
  .get(auth(), validate(eventValidation.getEvent), eventController.getEvent)
  .patch(auth(), validate(eventValidation.updateEvent), eventController.updateEvent)
  .delete(auth(), validate(eventValidation.deleteEvent), eventController.deleteEvent);

// Event attendance
router
  .route('/:eventId/attendance')
  .post(auth(), validate(eventValidation.updateAttendance), eventController.updateAttendance);

// Linked posts
router
  .route('/:eventId/posts')
  .post(auth(), validate(eventValidation.linkPostToEvent), eventController.linkPostToEvent);

router
  .route('/:eventId/posts/:postId')
  .delete(auth(), validate(eventValidation.unlinkPostFromEvent), eventController.unlinkPostFromEvent);

module.exports = router;