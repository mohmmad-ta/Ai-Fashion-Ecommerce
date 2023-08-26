const Product = require('../models/productModel');
const factory = require('./handlerFactory');
const multer = require("multer");
const AppError = require("../utils/appError");
const catchAsync = require('./../utils/catchAsync');
const sharp = require("sharp");
const User = require("./../models/userModel");
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const APIFeatures = require("../utils/apiFeatures");

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});
exports.uploadProductPhoto = upload.fields([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 9},
])
exports.resizeTourImages = catchAsync(async (req, res, next) => {
    if (!req.files.imageCover || !req.files.images) return next();
    // 1) Cover image
    req.body.imageCover = `${req.protocol}://${req.get('host')}/public/images/products/${Date.now()}-${req.files.imageCover.fieldname}.jpeg`;
    const nameImageCover = `${Date.now()}-${req.params.id}.jpeg`;
    console.log(req.body.imageCover)
    await sharp(req.files.imageCover[0].buffer)
        .toFormat('jpeg')
        .jpeg({ quality: 100 })
        .toFile(`public/images/products/${nameImageCover}`);

    // 2) Images
    req.body.images = [];
    await Promise.all(
        req.files.images.map(async (file, i) => {
            const nameImages = `${Date.now()}-${req.files.images[i].fieldname}.jpeg`;
            const filename = `${req.protocol}://${req.get('host')}/public/images/products/${Date.now()}-${req.files.images[i].fieldname}.jpeg`;

            await sharp(file.buffer)
                .toFormat('jpeg')
                .jpeg({ quality: 100 })
                .toFile(`public/images/products/${nameImages}`);

            req.body.images.push(filename);
        })
    );
    const imageBuffer = fs.readFileSync(`public/images/products/${nameImageCover}`);
    let classOutput = ['Jeans', 'Tshirts', 'Shirts', 'Watches', 'Casual Shoes', 'Formal Shoes', 'Kurtas', 'Handbags', 'Waistcoat', 'Sandals', 'Sports Shoes', 'Tops', 'Night suits', 'Flip Flops', 'Heels', 'Flats', 'Sweatshirts', 'Perfume and Body Mist', 'Kurta Sets', 'Bra', 'Trousers', 'Camisoles', 'Wallets', 'Bath Robe', 'Mufflers', 'Lounge Pants', 'Necklace and Chains', 'Backpacks', 'Track Pants', 'Foundation and Primer', 'Sweaters', 'Sunglasses', 'Shorts', 'Caps', 'Innerwear Vests', 'Tunics', 'Dresses', 'Baby Dolls', 'Clutches', 'Belts', 'Jackets', 'Lipstick', 'Kurtis', 'Nightdress', 'Messenger Bag', 'Eye Cream', 'Accessory Gift Set', 'Capris', 'Deodorant', 'Socks', 'Travel Accessory', 'Free Gifts', 'Water Bottle', 'Earrings', 'Dupatta', 'Duffel Bag', 'Skirts', 'Ties', 'Mobile Pouch', 'Briefs', 'Leggings', 'Patiala', 'Tracksuits', 'Stockings', 'Laptop Bag', 'Pendant', 'Fragrance Gift Set', 'Tights', 'Sports Sandals', 'Lip Gloss', 'Churidar', 'Face Moisturisers', 'Lounge Shorts', 'Gloves', 'Shoe Accessories', 'Scarves', 'Tablet Sleeve', 'Footballs', 'Ring', 'Nehru Jackets', 'Cufflinks', 'Rompers', 'Jewellery Set', 'Booties', 'Bracelet', 'Nail Polish', 'Swimwear', 'Hair Accessory', 'Basketballs', 'Hair Colour', 'Lehenga Choli', 'Jeggings', 'Salwar', 'Bangle', 'Kajal and Eyeliner', 'Rucksacks', 'Stoles', 'Waist Pouch', 'Blazers', 'Clothing Set', 'Boxers', 'Compact', 'Shrug', 'Headband', 'Face Serum and Gel', 'Umbrellas', 'Eyeshadow', 'Jumpsuit', 'Sarees', 'Makeup Remover', 'Wristbands', 'Highlighter and Blush']
    let modelAi = await tf.loadLayersModel('file://public/modelAi/modelFashion.json')
    let INPUT = [];
    const imageTensor = tf.node.decodeImage(imageBuffer)
    let resizedTensor = tf.image.resizeBilinear(imageTensor,[84, 84], true)
    let normalizedTensor = resizedTensor.div(255)
    INPUT.push(normalizedTensor);
    let inputTensors = tf.stack(INPUT);
    let output = await modelAi.predict(inputTensors).squeeze().argMax()
    let predictOutput = await output.array()
    req.body.class = classOutput[predictOutput]


    next();
});


exports.getAllProduct = factory.getAll(Product);
exports.getOneProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);



exports.isMyProduct = async (req, res, next)=>{
    const user = await User.findById(req.user.id).select('role')
    if (user.role === 'admin'){
        next()
    }else if (user.role === 'shop'){
        const product = await Product.findById(req.params.id).select('user')
        product.id === req.user.id ? next() : next(new AppError('Your id not same owner product', 400))
    }
}
exports.MyProduct = async (req, res, next)=>{
    const product = await Product.find({userId: req.user.id})
    res.status(200).json({status: 'success', data: product});
}

exports.FilterProduct = async (req, res, next)=>{
    let product = await Product.find({class: req.query.class})
    res.status(200).json({status: 'success', data: product});
}


