const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Booking must belong to a Product!']
  },
  shop: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a shop User!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: false
  }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate('user').populate({
    path: 'product',
    select: 'name price imageCover'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
