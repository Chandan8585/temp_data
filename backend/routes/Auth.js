const express = require('express');
const Seller = require('../models/seller');
const validateSignup = require('../utils/validateSignup');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { sellerAuth } = require('../middlewares/sellerAuth');
require("dotenv").config();
const jwt = require("jsonwebtoken");

authRouter.post('/signup', async(req, res)=>{ 
    try { 
        const isSellerDataSafe = await validateSignup(req);
        if(isSellerDataSafe){
            const {email, password, mobile} = req.body;
            // const hashedPassword =await bcrypt.hash(password, 10);
              
            const sellerObject = {
                email,
                password,
                mobile
            };
            const newSeller = new Seller(sellerObject);
          await newSeller.save();
          res.status(200).json({message: "Your Account has been created successfully, Now you are being redirected to Login page"});
        }else{
            res.status(200).json({message: "Enter Valid Details"});
        }
    }
      catch (error) {

        res.status(401).json({message: error.message});
      
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for email:", email);

        const seller = await Seller.findOne({ email });
        if (!seller) {
            console.log("Seller not found!");
            return res.status(400).json({ message: "Seller not found. Please sign up first." });
        }

        console.log("Seller found:", seller);

        const isPasswordValid = await bcrypt.compare(password, seller.password);
        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Incorrect password!");
            return res.status(400).json({ message: "Incorrect password." });
        }

        const token = jwt.sign({ _id: seller._id, email: seller.email }, process.env.JWT_KEY, { expiresIn: "1d" });
        console.log("JWT Token generated:", token);

        res.cookie("token", token, {
            httpOnly: true,  
            secure: true,   // Must be true if using SameSite=None
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000 
        });
    
        res.status(200).json({ message: "Login successful!", token });
        
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});



authRouter.post('/logout', async(req , res)=>{
    try {
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("Logout Successfull!!!");
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.post('/forgotPassword', async(req , res)=>{
    try {
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("Logout Successfull!!!");
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.get('/verify', sellerAuth ,async (req, res)=> {
      try {
        req.seller.isVerifed = true;
      } catch (error) {
        res.status(500).send("Failed to verify the seller.");
      }
}) 



module.exports = authRouter;