const express = require('express');
const { sellerAuth } = require('../middlewares/sellerAuth'); // Middleware for seller authentication
const Cart = require('../models/cart'); // Cart model
const Product = require('../models/product'); // Product model

const cartRouter = express.Router();

// Get cart items
cartRouter.get('', sellerAuth, async (req, res) => {
    try {
        const sellerId = req.seller._id; // Extract seller ID from the authenticated request
        const cart = await Cart.find({ seller: sellerId }).populate('product'); // Populate product details
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart items" });
    }
});

// Add product to cart
cartRouter.post('/add', sellerAuth, async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const sellerId = req.seller._id;

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the product already exists in the cart
        const existingCartItem = await Cart.findOne({ seller: sellerId, product: productId });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
        } else {
            const newCartItem = new Cart({
                seller: sellerId,
                product: productId,
                price: product.price, // Save the product price at the time of addition
                quantity
            });
            await newCartItem.save();
        }
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add product to cart" });
    }
});

// Remove product from cart
cartRouter.delete('/product/:productId', sellerAuth, async (req, res) => {
    try {
        const { productId } = req.params;
        const sellerId = req.seller._id;

        await Cart.deleteOne({ seller: sellerId, product: productId });
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to remove product from cart" });
    }
});

// Increase product quantity
cartRouter.post('/product/:productId/increase', sellerAuth, async (req, res) => {
    try {
        const { productId } = req.params;
        const sellerId = req.seller._id;

        const cartItem = await Cart.findOne({ seller: sellerId, product: productId }).populate("product");
        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
            res.status(200).json({ message: "Product quantity increased successfully", data :cartItem.quantity });
        } else {
            return res.status(200).json({ message: "Add product from zero", data: 0 });
        }
    } catch (error) {
        console.log("error" ,error);
        res.status(500).json({ error: "Failed to increase product quantity" });
    }
});

// Decrease product quantity
cartRouter.post('/product/:productId/decrease', sellerAuth, async (req, res) => {
    try {
        const { productId } = req.params;
        const sellerId = req.seller._id;

        const cartItem = await Cart.findOne({ seller: sellerId, product: productId }).populate("product");
        if (cartItem) {
            if (cartItem.quantity === 1) {
                await Cart.deleteOne({ seller: sellerId, product: productId });
                res.status(200).json({ message: "Product removed from cart successfully", data: 0 });
            } else {
                cartItem.quantity -= 1;
                await cartItem.save();
                res.status(200).json({ message: "Product quantity decreased successfully", data: cartItem.quantity });
            }
        } else {
            
            return res.status(200).json({ message: "Product already removed from cart", data: 0 });
        }
    } catch (error) {
        
        res.status(500).json({ error: "Failed to decrease product quantity" });
    }
});

// Calculate cart totals
cartRouter.get('/totals', sellerAuth, async (req, res) => {
    try {
        const sellerId = req.seller._id;
        const cartItems = await Cart.find({ seller: sellerId }).populate('product');

        const subtotal = cartItems.reduce((sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity), 0);
        const tax = subtotal * 0.1; // Example: 10% tax
        const discount = 5; // Example discount value
        const total = subtotal - discount + tax;

        res.status(200).json({
            subtotal: Math.round(subtotal * 100) / 100,
            tax: Math.round(tax * 100) / 100,
            discount,
            total: Math.round(total * 100) / 100
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to calculate totals" });
    }
});

module.exports = cartRouter;
