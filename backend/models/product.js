const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,required: true },
    subCategory: { type: String, required: true },
    counter: {type: mongoose.Schema.Types.ObjectId, ref: 'Counter', required: true},
    unit: {
        type: String,
        enum: ["kg", "m", "litre", "millilitre"],
        required: true,
    },
    sellingPrice: { type: Number },
    costPrice: { type: Number },
    stock: {
        available: { type: Number },
        sold: { type: Number},
    },
    brand:{type: String},
    hsn: {type: String},
    gst: {
        gstType: {type: Boolean},
        gstNumber: {type: String}
    },
    image: { type: String },
    fastMoving: {type: Boolean}
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
