const mongoose = require('mongoose');
// const Category = require('./categories');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    available: { type: Number },
    sold: { type: Number},
    discount: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,required: true },
    image: { type: String },
    rating: {
        rate: { type: Number, min: 1, max: 5 },
        count: { type: Number, min: 0 },
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
