const Product = require('../models/bookingModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require("../utils/appError");

exports.myBooking = catchAsync(async (req, res, next)=>{
  const booking = await Booking.find({ user: req.user.id });
  res.status(201).json({
    status: 'success',
    length: booking.length,
    data: booking
  })
})
exports.isMyBooking = catchAsync(async (req, res, next)=>{
  const booking = await Booking.findById(req.params.id);
  if (booking.user.id !== req.user.id || !booking){
    return next(new AppError('No found this booking with that ID', 404));
  }
  next()
})

exports.paid = catchAsync(async (req, res, next)=>{
  const booking = await Booking.find({ user: req.user.id }).updateMany({paid: req.body.paid})
  if (!booking){
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    length: booking.length,
    data: booking
  })
})

exports.MyProductBooking = catchAsync(async (req, res, next)=>{
  const booking = await Booking.find({ shop: req.user.id }).find({paid: true})
  if (!booking){
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    length: booking.length,
    data: booking
  })
})



exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
