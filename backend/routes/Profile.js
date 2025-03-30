const express = require('express');
const Seller = require('../models/seller');
const { sellerAuth } = require('../middlewares/sellerAuth');
const profileRouter = express.Router();

profileRouter.get("/profile", sellerAuth, async (req, res) => {
    try {
        const seller = req.seller; 
        res.status(200).json(seller);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});


profileRouter.patch("/profile", sellerAuth, async (req, res)=>{
    console.log("Request Body:", req.body);
console.log("Request Headers:", req.headers);

    try {   
        const seller = req.seller;
        const allowedUpdates = ["photoUrl", "postal", "state", "city", "streetAddress", "shopName", "sellerName", "gst"];

        
        const updates = Object.keys(req.body);
        const isValidOperation = updates.every(field=> allowedUpdates.includes(field));
        if(!isValidOperation){
            return res.status(400).send({error: "Invalid updates!"});
        }
        updates.forEach(field=>{
            seller[field] = req.body[field];
        })
        await seller.save();
        res.status(200).send(seller);
    } catch (error) {
        res.status(500).send({ error: "Something went wrong" });
    }
});

module.exports = {profileRouter};