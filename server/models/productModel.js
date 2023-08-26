const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, 'A product must have a name'],
            trim: true,
            maxlength: [30, 'A product name must have less or equal then 30 characters'],
            minlength: [4, 'A product name must have more or equal then 4 characters']
        },
        description: {
            type: String,
            require: true,
        },
        ratingsAverage: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must be above 1.0'],
            max: [5, 'Rating must be below 5.0'],
            set: val => Math.round(val * 10) / 10
        },
        price: {
            type: Number,
            required: [true, 'A tour must have a price']
        },
        priceDiscount: {
            type: Number,
            validate: {
                validator: function(val) {
                    return val < this.price;
                },
                message: 'Discount price ({VALUE}) should be below regular price'
            }
        },
        imageCover: {
            type: String,
            require: [true, 'A product must have a cover image']
        },
        images: [String],
        colors: [String],
        sizes: [String],
        class: String,
        userCreated: String,
        createAt:{
            type: Date,
            default: Date.now(),
            select: false
        },
        userId: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});
// productSchema.virtual('booking', {
//     ref: 'Booking',
//     foreignField: 'product',
//     localField: '_id'
// });
productSchema.pre(/^find/, function (next){
    this.populate({
        path:'user',
        select: '-__v -passwordChangedAt'
    }).populate({
        path:'reviews',
    })
    next()
})


module.exports = mongoose.model('Product', productSchema);