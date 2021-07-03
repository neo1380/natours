const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  next();
});

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getAllTourById)
  .patch(tourController.updateTour);

module.exports = router;
