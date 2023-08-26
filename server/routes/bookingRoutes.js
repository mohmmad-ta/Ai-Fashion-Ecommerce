const express = require('express');
const { getAllBookings, createBooking, deleteBooking, getBooking, updateBooking, isMyBooking, myBooking, paid, MyProductBooking} = require('./../controllers/bookingController');
const {protect, restrictTo} = require('./../controllers/authController');

const router = express.Router();

router.get('/myProductBooking', protect, restrictTo('shop'), MyProductBooking)

router.use(protect, restrictTo('user'));
router.patch('/paid', paid)


router.route('/my')
    .get(myBooking)
    .post(createBooking)

router.route('/my/:id')
    .get(isMyBooking, getBooking)
    .patch(isMyBooking, updateBooking)
    .delete(isMyBooking, deleteBooking);

router.use(restrictTo('admin'));
router
  .route('/')
  .get(getAllBookings)
  .post(createBooking);

router
  .route('/:id')
  .get(getBooking)
  .patch(updateBooking)
  .delete(deleteBooking);

module.exports = router;
