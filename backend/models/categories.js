const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true, 
        unique: true 
    },
    name : {
        type: String,
        required: true, 
    },
    icon: { 
        type: String, 
        required: true, 
    }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

  