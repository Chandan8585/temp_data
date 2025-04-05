const express = require('express');
const Product = require('../models/product');
const Counter = require('../models/counter');
const { sellerAuth } = require('../middlewares/sellerAuth');
const Category = require('../models/categories');
const productRouter = express.Router();
productRouter.get("/", async(req, res) => {
    try {
        const { category, subCategory ,search } = req.query;
        const categoryKey = await Category.find({});
        const filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }
        if (subCategory && subCategory !== "all") {
            filter.subCategory = subCategory;
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }; 
        }
        console.log("Applied Filter:", filter);
        const products = await Product.find(filter).populate("category", "name"); 
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});
productRouter.post("/", sellerAuth, async (req, res) => {
    console.log("Request Body:", req.body);
    console.log("Request Headers:", req.headers);

    try {
        const { 
            name, 
            category, 
            subCategory, 
            counter, 
            unit, 
            sellingPrice, 
            costPrice, 
            stock, 
            brand, 
            hsn, 
            gst, 
            image, 
            fastMoving 
        } = req.body;

        if (!name || !category || !sellingPrice) {
            return res.status(400).json({ error: "Missing required fields: name, category, sellingPrice, costPrice, stock, or image" });
        }

        if (subCategory) {
            const categoryDoc = await Category.findById(category);
            console.log("Category Document:", categoryDoc);  // Debugging log
            if (!categoryDoc || !categoryDoc.subCategory || !categoryDoc.subCategory.map(sc => sc.toLowerCase()).includes(subCategory.toLowerCase())) {
                return res.status(400).json({ error: `Invalid subCategory: ${subCategory} for the selected category` });
            }
        }

        const Productbody = { 
            name, 
            category, 
            subCategory, 
            counter, 
            unit, 
            sellingPrice, 
            costPrice, 
            stock, 
            brand, 
            hsn, 
            gst, 
            image, 
            fastMoving 
        };

        const newProduct = new Product(Productbody);

        await newProduct.save();

        res.status(200).json({ message: "New product created", product: newProduct });
    } catch (error) {
        console.error(error);  // Log the error
        res.status(500).send({ error: "Something went wrong" });
    }
});


productRouter.get('/counter', async(req, res)=> {
    try {
        const counters = await Counter.find({});
        res.status(500).json(counters);
    } catch (error) {
        
    }
})

module.exports = {productRouter}