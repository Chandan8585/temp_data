    const express = require('express');
    const connectDB = require('./config/database');
    // const seller = require('./models/seller');
    const Order = require('./models/order');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { sellerAuth } = require('./middlewares/sellerAuth');
const authRouter = require('./routes/Auth');
const { profileRouter } = require('./routes/Profile');
const Product = require('./models/product');
const cartRouter = require('./routes/Cart');
const Category = require('./models/categories');
const { categoryRouter } = require('./routes/Category');
require('dotenv').config()
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    app.use(cors());
    
app.use("/", profileRouter);
 app.use("/", authRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.post('/orders', sellerAuth, async (req, res) => {
    const { dishId, quantity } = req.body;   
    try {
        const dish = await Product.findById(dishId);  
        if (!dish) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const totalPrice = dish.price * quantity;
        const newOrder = new Order({
            seller: req.seller._id,  
            dish: dishId,
            quantity,
            totalPrice,
            status: 'pending'  
        });
        await newOrder.save();  
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.get("/product", async (req, res) => {
    try {
        const { category, search } = req.query;
        const filter = {};

        if (category && category !== "all") {
            filter.category = category;
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }; // case-insensitive search
        }
        console.log("Applied Filter:", filter);
        const products = await Product.find(filter); 
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
});


connectDB().then(()=>app.listen(5001, ()=>{
        console.log("running on port 5001");
    })
    )