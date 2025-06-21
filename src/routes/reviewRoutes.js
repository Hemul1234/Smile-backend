const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.patch('/:id', reviewController.patchReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;