const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'seller', 
        required: true, 
    },
    product: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true, 
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    price: { 
        type: Number,
        required: true, 
    },
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
