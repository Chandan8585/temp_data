    const express = require('express');
    const connectDB = require('./config/database');
    // const seller = require('./models/seller');
    const Order = require('./models/order');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { sellerAuth } = require('./middlewares/sellerAuth');
const authRouter = require('./routes/Auth');
const { profileRouter } = require('./routes/Profile');
const cartRouter = require('./routes/Cart');
const { categoryRouter } = require('./routes/Category');
const { productRouter } = require('./routes/Product');
const { customerRouter } = require('./routes/Customer');
const Counter = require('./models/counter');
require('dotenv').config()
    const app = express();
    app.use(express.json());
    app.use(cookieParser());

    app.use(cors());
app.use("/", authRouter);
app.use("/", profileRouter); 
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/customer", customerRouter);
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
app.get('/counter', async(req, res)=>{
    try {
        const counter = await Counter.find({});
        res.status(200).json({
        counter
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})



connectDB().then(()=>app.listen(5001, ()=>{
        console.log("running on port 5001");
    })
    )